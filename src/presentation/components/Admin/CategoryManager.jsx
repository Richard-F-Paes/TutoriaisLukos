// CategoryManager - Gerenciamento de categorias
import React, { useState } from 'react';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../../../hooks/useCategories.js';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CategoryManager = () => {
  const { data: categoriesData, isLoading } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const categories = categoriesData?.data || [];

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Tem certeza que deseja excluir a categoria "${name}"?`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Categoria excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir categoria');
    }
  };

  return (
    <div className="category-manager">
      <div className="manager-header">
        <h2>Gerenciar Categorias</h2>
        <button className="btn-primary">
          <Plus size={18} />
          Nova Categoria
        </button>
      </div>

      {isLoading ? (
        <div className="loading">Carregando categorias...</div>
      ) : (
        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.Id} className="category-card">
              <h3>{category.Name}</h3>
              <p>{category.Description || 'Sem descrição'}</p>
              <div className="category-actions">
                <button className="btn-icon" title="Editar">
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(category.Id, category.Name)}
                  className="btn-icon btn-danger"
                  title="Excluir"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
