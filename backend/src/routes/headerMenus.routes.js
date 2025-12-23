import express from 'express';
import { getPrisma } from '../config/database.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';
import { createAuditLog, getRequestInfo } from '../utils/auditHelper.js';
import { invalidateCachePrefix } from '../utils/cache.js';

const router = express.Router();

const normalizeItem = (it) => ({
  ...it,
  Label: it.label,
  TutorialSlug: it.tutorialSlug,
  Order: it.order,
  ParentId: it.parentId ?? null,
  IsSubmenu: it.isSubmenu ?? false,
  isSubmenu: it.isSubmenu ?? false,
});

const buildItemsTree = (flatItems) => {
  const items = (flatItems || []).map(normalizeItem);
  const byParent = new Map();
  for (const it of items) {
    const key = it.parentId ?? null;
    const list = byParent.get(key) || [];
    list.push(it);
    byParent.set(key, list);
  }

  const sortByOrder = (a, b) => (a.Order ?? 0) - (b.Order ?? 0);

  const attach = (parentId) => {
    const children = (byParent.get(parentId ?? null) || []).sort(sortByOrder);
    return children.map((child) => {
      const grandChildren = attach(child.id);
      // compat: expor tanto Children quanto children
      return {
        ...child,
        Children: grandChildren,
        children: grandChildren,
      };
    });
  };

  return attach(null);
};

const coerceInputChildren = (it) => it?.Children ?? it?.children ?? [];

const sanitizeInputItem = (it) => ({
  label: it?.Label ?? it?.label ?? '',
  tutorialSlug: it?.TutorialSlug ?? it?.tutorialSlug ?? null,
  isSubmenu: it?.IsSubmenu ?? it?.isSubmenu ?? false,
  order: it?.Order ?? it?.order,
  children: coerceInputChildren(it),
});

const createItemsRecursive = async (prisma, headerMenuId, items, parentId = null) => {
  if (!Array.isArray(items) || items.length === 0) return;

  // manter a ordem de criação estável (Order ou índice)
  const normalized = items.map(sanitizeInputItem).map((it, idx) => ({
    ...it,
    order: it.order === undefined ? idx : parseInt(it.order) || 0,
  }));

  for (let idx = 0; idx < normalized.length; idx += 1) {
    const it = normalized[idx];
    const label = String(it.label || '').trim();
    if (!label) continue;

    // Regra: se isSubmenu=true OU tiver children, vira "pai" e não deve navegar (tutorialSlug é ignorado)
    const isSubmenu = Boolean(it.isSubmenu);
    const hasChildren = Array.isArray(it.children) && it.children.length > 0;
    // Se for submenu (explicito ou implícito por ter filhos), não pode ter tutorialSlug
    const tutorialSlug = (isSubmenu || hasChildren) ? null : (it.tutorialSlug ? String(it.tutorialSlug) : null);
    // Se tiver filhos, garantir que isSubmenu=true
    const finalIsSubmenu = isSubmenu || hasChildren;

    const created = await prisma.headerMenuItem.create({
      data: {
        headerMenuId,
        parentId,
        label,
        tutorialSlug,
        isSubmenu: finalIsSubmenu,
        order: it.order,
      },
    });

    if (hasChildren) {
      // eslint-disable-next-line no-await-in-loop
      await createItemsRecursive(prisma, headerMenuId, it.children, created.id);
    }
  }
};

const normalizeMenu = (menu) => {
  // Expõe também em formato compatível com frontend (Label/Items/Order)
  return {
    ...menu,
    Label: menu.label,
    Order: menu.order,
    Items: buildItemsTree(menu.items || []),
  };
};

// Listar menus
router.get('/', async (req, res) => {
  try {
    const prisma = getPrisma();
    if (!prisma?.headerMenu?.findMany) {
      // Ambiente offline/mock ou PrismaClient desatualizado
      return res.json({ data: [] });
    }
    const menus = await prisma.headerMenu.findMany({
      orderBy: { order: 'asc' },
      include: { items: { orderBy: { order: 'asc' } } },
    });
    res.json({ data: menus.map(normalizeMenu) });
  } catch (error) {
    console.error('Erro ao listar header menus:', error);
    res.status(500).json({ error: 'Erro ao listar menus do header' });
  }
});

// Obter menu por ID
router.get('/:id', async (req, res) => {
  try {
    const prisma = getPrisma();
    if (!prisma?.headerMenu?.findUnique) {
      return res.status(503).json({ error: 'Header menus indisponível (DB offline ou Prisma client desatualizado)' });
    }
    const id = parseInt(req.params.id);
    const menu = await prisma.headerMenu.findUnique({
      where: { id },
      include: { items: { orderBy: { order: 'asc' } } },
    });
    if (!menu) return res.status(404).json({ error: 'Menu não encontrado' });
    res.json({ data: normalizeMenu(menu) });
  } catch (error) {
    console.error('Erro ao obter header menu:', error);
    res.status(500).json({ error: 'Erro ao obter menu do header' });
  }
});

// Criar menu
router.post('/', authenticate, requirePermission('manage_categories'), async (req, res) => {
  try {
    const prisma = getPrisma();
    if (!prisma?.headerMenu?.create || !prisma?.$transaction) {
      return res.status(503).json({ error: 'Header menus indisponível (DB offline ou Prisma client desatualizado)' });
    }
    const label = req.body.Label ?? req.body.label;
    const order = req.body.Order ?? req.body.order ?? 0;
    const items = req.body.Items ?? req.body.items ?? [];

    const created = await prisma.$transaction(async (tx) => {
      const menu = await tx.headerMenu.create({
        data: {
          label,
          order: parseInt(order) || 0,
        },
      });

      if (Array.isArray(items) && items.length > 0) {
        await createItemsRecursive(tx, menu.id, items, null);
      }

      return tx.headerMenu.findUnique({
        where: { id: menu.id },
        include: { items: { orderBy: { order: 'asc' } } },
      });
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    if (userId) {
      const { ipAddress, userAgent } = getRequestInfo(req);
      await createAuditLog({
        userId,
        action: 'CREATE',
        entityType: 'HeaderMenu',
        entityId: created.id,
        newValues: { label: created.label, order: created.order, itemsCount: created.items?.length || 0 },
        ipAddress,
        userAgent,
      });
    }

    // Invalidar cache de header menus
    await invalidateCachePrefix('headerMenus').catch(err => console.error('Erro ao invalidar cache:', err));

    res.status(201).json({ data: normalizeMenu(created) });
  } catch (error) {
    console.error('Erro ao criar header menu:', error);
    res.status(500).json({ error: 'Erro ao criar menu do header' });
  }
});

// Atualizar menu (substitui Items)
router.put('/:id', authenticate, requirePermission('manage_categories'), async (req, res) => {
  try {
    const prisma = getPrisma();
    if (!prisma?.headerMenu?.update || !prisma?.headerMenuItem?.deleteMany || !prisma?.headerMenuItem?.create || !prisma?.$transaction) {
      return res.status(503).json({ error: 'Header menus indisponível (DB offline ou Prisma client desatualizado)' });
    }
    const id = parseInt(req.params.id);
    const label = req.body.Label ?? req.body.label;
    const order = req.body.Order ?? req.body.order;
    const items = req.body.Items ?? req.body.items;

    // Buscar valores antigos antes de atualizar
    const oldMenu = await prisma.headerMenu.findUnique({
      where: { id },
      include: { items: { orderBy: { order: 'asc' } } },
    });

    if (!oldMenu) {
      return res.status(404).json({ error: 'Menu não encontrado' });
    }

    await prisma.$transaction(async (tx) => {
      // Atualiza menu
      await tx.headerMenu.update({
        where: { id },
        data: {
          label: label ?? undefined,
          order: order === undefined ? undefined : parseInt(order),
        },
      });

      // Se veio items, substituir coleção
      if (Array.isArray(items)) {
        await tx.headerMenuItem.deleteMany({ where: { headerMenuId: id } });
        if (items.length > 0) {
          await createItemsRecursive(tx, id, items, null);
        }
      }
    });

    const updated = await prisma.headerMenu.findUnique({
      where: { id },
      include: { items: { orderBy: { order: 'asc' } } },
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    if (userId) {
      const { ipAddress, userAgent } = getRequestInfo(req);
      await createAuditLog({
        userId,
        action: 'UPDATE',
        entityType: 'HeaderMenu',
        entityId: id,
        oldValues: { label: oldMenu.label, order: oldMenu.order, itemsCount: oldMenu.items?.length || 0 },
        newValues: { label: updated.label, order: updated.order, itemsCount: updated.items?.length || 0 },
        ipAddress,
        userAgent,
      });
    }

    // Invalidar cache de header menus
    await invalidateCachePrefix('headerMenus').catch(err => console.error('Erro ao invalidar cache:', err));

    res.json({ data: normalizeMenu(updated) });
  } catch (error) {
    console.error('Erro ao atualizar header menu:', error);
    res.status(500).json({ error: 'Erro ao atualizar menu do header' });
  }
});

// Excluir menu
router.delete('/:id', authenticate, requirePermission('manage_categories'), async (req, res) => {
  try {
    const prisma = getPrisma();
    if (!prisma?.headerMenu?.delete) {
      return res.status(503).json({ error: 'Header menus indisponível (DB offline ou Prisma client desatualizado)' });
    }
    const id = parseInt(req.params.id);
    
    // Buscar valores antes de deletar
    const oldMenu = await prisma.headerMenu.findUnique({
      where: { id },
      include: { items: { orderBy: { order: 'asc' } } },
    });

    if (!oldMenu) {
      return res.status(404).json({ error: 'Menu não encontrado' });
    }

    await prisma.headerMenu.delete({ where: { id } });

    // Criar log de auditoria
    const userId = req.user?.id;
    if (userId) {
      const { ipAddress, userAgent } = getRequestInfo(req);
      await createAuditLog({
        userId,
        action: 'DELETE',
        entityType: 'HeaderMenu',
        entityId: id,
        oldValues: { label: oldMenu.label, order: oldMenu.order, itemsCount: oldMenu.items?.length || 0 },
        ipAddress,
        userAgent,
      });
    }

    // Invalidar cache de header menus
    await invalidateCachePrefix('headerMenus').catch(err => console.error('Erro ao invalidar cache:', err));

    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir header menu:', error);
    res.status(500).json({ error: 'Erro ao excluir menu do header' });
  }
});

// Reordenar menus
router.post('/reorder', authenticate, requirePermission('manage_categories'), async (req, res) => {
  try {
    const prisma = getPrisma();
    if (!prisma?.$transaction || !prisma?.headerMenu?.update) {
      return res.status(503).json({ error: 'Header menus indisponível (DB offline ou Prisma client desatualizado)' });
    }
    const { menuIds } = req.body;
    if (!Array.isArray(menuIds) || menuIds.length === 0) {
      return res.status(400).json({ error: 'menuIds é obrigatório' });
    }

    // Buscar valores antigos antes de reordenar
    const oldMenus = await prisma.headerMenu.findMany({
      where: { id: { in: menuIds.map(id => parseInt(id)) } },
      orderBy: { order: 'asc' },
    });

    await prisma.$transaction(
      menuIds.map((id, idx) =>
        prisma.headerMenu.update({
          where: { id: parseInt(id) },
          data: { order: idx },
        })
      )
    );

    const menus = await prisma.headerMenu.findMany({
      orderBy: { order: 'asc' },
      include: { items: { orderBy: { order: 'asc' } } },
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    if (userId) {
      const { ipAddress, userAgent } = getRequestInfo(req);
      await createAuditLog({
        userId,
        action: 'UPDATE',
        entityType: 'HeaderMenu',
        entityId: null,
        oldValues: { order: oldMenus.map(m => ({ id: m.id, order: m.order })) },
        newValues: { order: menus.map(m => ({ id: m.id, order: m.order })) },
        ipAddress,
        userAgent,
      });
    }

    res.json({ data: menus.map(normalizeMenu) });
  } catch (error) {
    console.error('Erro ao reordenar header menus:', error);
    res.status(500).json({ error: 'Erro ao reordenar menus do header' });
  }
});

export default router;


