import express from 'express';
import { getPrisma } from '../config/database.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';

const router = express.Router();

const normalizeMenu = (menu) => {
  // Expõe também em formato compatível com frontend (Label/Items/Order)
  return {
    ...menu,
    Label: menu.label,
    Order: menu.order,
    Items: (menu.items || []).map((it) => ({
      ...it,
      Label: it.label,
      TutorialSlug: it.tutorialSlug,
      Order: it.order,
    })),
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
    if (!prisma?.headerMenu?.create) {
      return res.status(503).json({ error: 'Header menus indisponível (DB offline ou Prisma client desatualizado)' });
    }
    const label = req.body.Label ?? req.body.label;
    const order = req.body.Order ?? req.body.order ?? 0;
    const items = req.body.Items ?? req.body.items ?? [];

    const created = await prisma.headerMenu.create({
      data: {
        label,
        order: parseInt(order) || 0,
        items: {
          create: (items || []).map((it, idx) => ({
            label: it.Label ?? it.label,
            tutorialSlug: it.TutorialSlug ?? it.tutorialSlug ?? null,
            order: it.Order ?? it.order ?? idx,
          })),
        },
      },
      include: { items: { orderBy: { order: 'asc' } } },
    });

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
    if (!prisma?.headerMenu?.update || !prisma?.headerMenuItem?.deleteMany || !prisma?.headerMenuItem?.createMany) {
      return res.status(503).json({ error: 'Header menus indisponível (DB offline ou Prisma client desatualizado)' });
    }
    const id = parseInt(req.params.id);
    const label = req.body.Label ?? req.body.label;
    const order = req.body.Order ?? req.body.order;
    const items = req.body.Items ?? req.body.items;

    // Atualiza menu
    await prisma.headerMenu.update({
      where: { id },
      data: {
        label: label ?? undefined,
        order: order === undefined ? undefined : parseInt(order),
      },
    });

    // Se veio items, substituir coleção
    if (Array.isArray(items)) {
      await prisma.headerMenuItem.deleteMany({ where: { headerMenuId: id } });
      if (items.length > 0) {
        await prisma.headerMenuItem.createMany({
          data: items.map((it, idx) => ({
            headerMenuId: id,
            label: it.Label ?? it.label,
            tutorialSlug: it.TutorialSlug ?? it.tutorialSlug ?? null,
            order: it.Order ?? it.order ?? idx,
          })),
        });
      }
    }

    const updated = await prisma.headerMenu.findUnique({
      where: { id },
      include: { items: { orderBy: { order: 'asc' } } },
    });
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
    await prisma.headerMenu.delete({ where: { id } });
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
    res.json({ data: menus.map(normalizeMenu) });
  } catch (error) {
    console.error('Erro ao reordenar header menus:', error);
    res.status(500).json({ error: 'Erro ao reordenar menus do header' });
  }
});

export default router;


