import express from 'express';
import { getPrisma } from '../config/database.js';
import slugify from 'slugify';
import { authenticate } from '../middleware/auth.middleware.js';
import { requirePermission } from '../middleware/permissions.middleware.js';
import { createAuditLog, getRequestInfo } from '../utils/auditHelper.js';

const router = express.Router();

// Helper function to check for circular references
async function checkCircularReference(prisma, categoryId, parentId) {
  if (!parentId || categoryId === parentId) {
    return false; // No parent or self-reference
  }

  // Check if parentId is an ancestor of categoryId
  let currentParentId = parentId;
  const visited = new Set([categoryId]);

  while (currentParentId) {
    if (visited.has(currentParentId)) {
      return true; // Circular reference detected
    }
    visited.add(currentParentId);

    const parent = await prisma.category.findUnique({
      where: { id: currentParentId },
      select: { parentId: true },
    });

    if (!parent) {
      break;
    }

    currentParentId = parent.parentId;
  }

  return false;
}

// Listar todas as categorias
router.get('/', async (req, res) => {
  try {
    const prisma = getPrisma();
    const includeChildren = req.query.includeChildren === 'true';
    
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: includeChildren ? {
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
      } : undefined,
    });
    res.json(categories);
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ error: 'Erro ao listar categorias' });
  }
});

// Obter categoria por ID
router.get('/:id', async (req, res) => {
  try {
    const prisma = getPrisma();
    const category = await prisma.category.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        tutorials: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' },
        },
        parent: true,
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    res.json(category);
  } catch (error) {
    console.error('Erro ao obter categoria:', error);
    res.status(500).json({ error: 'Erro ao obter categoria' });
  }
});

// Listar subcategorias de uma categoria
router.get('/:id/children', async (req, res) => {
  try {
    const prisma = getPrisma();
    const children = await prisma.category.findMany({
      where: {
        parentId: parseInt(req.params.id),
        isActive: true,
      },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(children);
  } catch (error) {
    console.error('Erro ao listar subcategorias:', error);
    res.status(500).json({ error: 'Erro ao listar subcategorias' });
  }
});

// Criar categoria
router.post('/', authenticate, requirePermission('manage_categories'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const { name, description, icon, color, imageUrl, sortOrder, parentId } = req.body;

    // Validate parentId if provided
    if (parentId) {
      const parent = await prisma.category.findUnique({
        where: { id: parseInt(parentId) },
      });

      if (!parent) {
        return res.status(400).json({ error: 'Categoria pai não encontrada' });
      }

      // Validar que a categoria pai não é uma subcategoria (não pode ter parentId)
      if (parent.parentId !== null) {
        return res.status(400).json({ 
          error: 'Não é possível criar subcategoria de uma subcategoria. Apenas categorias principais podem ter subcategorias.' 
        });
      }
    }

    const slug = slugify(name, { lower: true, strict: true });

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        icon,
        color,
        imageUrl,
        sortOrder: sortOrder || 0,
        parentId: parentId ? parseInt(parentId) : null,
      },
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'CREATE',
      entityType: 'Category',
      entityId: category.id,
      newValues: { name: category.name, slug: category.slug },
      ipAddress,
      userAgent,
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Slug já existe' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Categoria pai inválida' });
    }
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
});

// Atualizar categoria
router.put('/:id', authenticate, requirePermission('manage_categories'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const categoryId = parseInt(req.params.id);
    const { name, description, icon, color, imageUrl, sortOrder, isActive, parentId } = req.body;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true, name: true, slug: true, isActive: true, parentId: true, sortOrder: true },
    });

    if (!existingCategory) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    // Validate parentId if provided
    if (parentId !== undefined) {
      if (parentId === null) {
        // Removing parent is allowed
      } else {
        const parent = await prisma.category.findUnique({
          where: { id: parseInt(parentId) },
        });

        if (!parent) {
          return res.status(400).json({ error: 'Categoria pai não encontrada' });
        }

        // Validar que a categoria pai não é uma subcategoria (não pode ter parentId)
        if (parent.parentId !== null) {
          return res.status(400).json({ 
            error: 'Não é possível criar subcategoria de uma subcategoria. Apenas categorias principais podem ter subcategorias.' 
          });
        }

        // Check for circular reference
        const hasCircularRef = await checkCircularReference(prisma, categoryId, parseInt(parentId));
        if (hasCircularRef) {
          return res.status(400).json({ error: 'Não é possível criar referência circular' });
        }
      }
    }

    const updateData = { description, icon, color, imageUrl, sortOrder, isActive };
    
    if (parentId !== undefined) {
      updateData.parentId = parentId ? parseInt(parentId) : null;
    }

    if (name) {
      updateData.name = name;
      updateData.slug = slugify(name, { lower: true, strict: true });
    }

    const category = await prisma.category.update({
      where: { id: categoryId },
      data: updateData,
    });

    // Criar log de auditoria
    const userId = req.user?.id;
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'UPDATE',
      entityType: 'Category',
      entityId: categoryId,
      oldValues: existingCategory,
      newValues: { 
        name: category.name, 
        slug: category.slug, 
        isActive: category.isActive, 
        parentId: category.parentId,
        sortOrder: category.sortOrder,
      },
      ipAddress,
      userAgent,
    });

    res.json(category);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Categoria pai inválida' });
    }
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
});

// Deletar categoria
router.delete('/:id', authenticate, requirePermission('manage_categories'), async (req, res) => {
  try {
    const prisma = getPrisma();
    const userId = req.user?.id;
    const categoryId = parseInt(req.params.id);

    // Buscar categoria antes de deletar para o log
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true, name: true, slug: true },
    });

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    // Check if category has children
    const children = await prisma.category.findMany({
      where: { parentId: categoryId },
    });

    if (children.length > 0) {
      return res.status(400).json({ 
        error: 'Não é possível deletar categoria que possui subcategorias. Remova ou mova as subcategorias primeiro.' 
      });
    }

    await prisma.category.delete({
      where: { id: categoryId },
    });

    // Criar log de auditoria
    const { ipAddress, userAgent } = getRequestInfo(req);
    await createAuditLog({
      userId,
      action: 'DELETE',
      entityType: 'Category',
      entityId: categoryId,
      oldValues: category,
      ipAddress,
      userAgent,
    });

    res.json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
});

export default router;
