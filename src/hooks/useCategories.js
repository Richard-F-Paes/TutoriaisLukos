// Hook useCategories - Gerencia categorias com React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services/categoryService.js';

// Helper function to structure categories hierarchically
function structureCategories(categories) {
  if (!Array.isArray(categories)) return [];
  
  // Separate parent categories and subcategories
  const parentCategories = categories.filter(cat => !cat.parentId);
  const subcategories = categories.filter(cat => cat.parentId);
  
  // Build a map of parent categories with their children
  const categoryMap = new Map();
  parentCategories.forEach(cat => {
    categoryMap.set(cat.id, { ...cat, children: [] });
  });
  
  // Add subcategories to their parents
  subcategories.forEach(subcat => {
    const parent = categoryMap.get(subcat.parentId);
    if (parent) {
      parent.children.push(subcat);
    }
  });
  
  // Sort children within each parent
  categoryMap.forEach(cat => {
    cat.children.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  });
  
  return Array.from(categoryMap.values()).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

export const useCategories = (includeChildren = false) => {
  return useQuery({
    queryKey: ['categories', includeChildren],
    queryFn: () => categoryService.list(includeChildren),
    staleTime: 10 * 60 * 1000, // 10 minutos
    select: (data) => {
      if (includeChildren) {
        return structureCategories(data);
      }
      return data;
    },
  });
};

export const useCategoriesHierarchical = () => {
  return useQuery({
    queryKey: ['categories', 'hierarchical'],
    queryFn: () => categoryService.list(true),
    staleTime: 10 * 60 * 1000,
    select: (data) => structureCategories(data),
  });
};

export const useCategory = (slug) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCategoryById = (id) => {
  return useQuery({
    queryKey: ['category', 'id', id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCategoryWithChildren = (id) => {
  return useQuery({
    queryKey: ['category', 'with-children', id],
    queryFn: () => categoryService.getWithChildren(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCategoryChildren = (id) => {
  return useQuery({
    queryKey: ['category', 'children', id],
    queryFn: () => categoryService.getChildren(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryData) => categoryService.create(categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => categoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => categoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
