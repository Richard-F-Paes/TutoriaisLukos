// HeaderMenuManager - Gerenciamento de menus do header no admin
import React, { useState } from 'react';
import { 
  useHeaderMenus, 
  useCreateHeaderMenu, 
  useUpdateHeaderMenu, 
  useDeleteHeaderMenu,
  useReorderHeaderMenus 
} from '../../../hooks/useHeaderMenus';
import { useTutorials } from '../../../hooks/useTutorials';
import { Plus, Edit, Trash2, GripVertical, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const HeaderMenuManager = () => {
  const [editingMenu, setEditingMenu] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [newMenuLabel, setNewMenuLabel] = useState('');
  const [newItemLabel, setNewItemLabel] = useState('');
  const [newItemTutorialSlug, setNewItemTutorialSlug] = useState('');

  const { data: menusData, isLoading } = useHeaderMenus();
  const { data: tutorialsData } = useTutorials();
  const createMutation = useCreateHeaderMenu();
  const updateMutation = useUpdateHeaderMenu();
  const deleteMutation = useDeleteHeaderMenu();
  const reorderMutation = useReorderHeaderMenus();

  const menus = menusData?.data || [];
  const tutorials = tutorialsData?.data || [];

  const handleCreateMenu = async () => {
    if (!newMenuLabel.trim()) {
      toast.error('O label do menu é obrigatório');
      return;
    }

    try {
      await createMutation.mutateAsync({
        Label: newMenuLabel,
        Items: [],
        Order: menus.length,
      });
      toast.success('Menu criado com sucesso!');
      setNewMenuLabel('');
      setShowAddMenu(false);
    } catch (error) {
      toast.error('Erro ao criar menu');
    }
  };

  const handleUpdateMenu = async (menuId, updates) => {
    try {
      await updateMutation.mutateAsync({ id: menuId, data: updates });
      toast.success('Menu atualizado com sucesso!');
      setEditingMenu(null);
    } catch (error) {
      toast.error('Erro ao atualizar menu');
    }
  };

  const handleDeleteMenu = async (menuId, menuLabel) => {
    if (!window.confirm(`Tem certeza que deseja excluir o menu "${menuLabel}"?`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(menuId);
      toast.success('Menu excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir menu');
    }
  };

  const handleAddItem = async (menuId, menu) => {
    if (!newItemLabel.trim()) {
      toast.error('O label do item é obrigatório');
      return;
    }

    if (!newItemTutorialSlug.trim()) {
      toast.error('O slug do tutorial é obrigatório');
      return;
    }

    const newItems = [
      ...(menu.Items || []),
      {
        Label: newItemLabel,
        TutorialSlug: newItemTutorialSlug,
      },
    ];

    await handleUpdateMenu(menuId, { ...menu, Items: newItems });
    setNewItemLabel('');
    setNewItemTutorialSlug('');
    setEditingItem(null);
  };

  const handleDeleteItem = async (menuId, menu, itemIndex) => {
    const newItems = (menu.Items || []).filter((_, index) => index !== itemIndex);
    await handleUpdateMenu(menuId, { ...menu, Items: newItems });
  };

  const handleUpdateItem = async (menuId, menu, itemIndex, updates) => {
    const newItems = [...(menu.Items || [])];
    newItems[itemIndex] = { ...newItems[itemIndex], ...updates };
    await handleUpdateMenu(menuId, { ...menu, Items: newItems });
  };

  if (isLoading) {
    return <div className="loading">Carregando menus...</div>;
  }

  return (
    <div className="header-menu-manager">
      <div className="manager-header">
        <h2>Gerenciar Menus do Header</h2>
        <button
          onClick={() => setShowAddMenu(true)}
          className="btn-primary"
        >
          <Plus size={18} />
          Novo Menu
        </button>
      </div>

      {showAddMenu && (
        <div className="add-menu-form">
          <input
            type="text"
            placeholder="Label do menu (ex: PDV, Retaguarda)"
            value={newMenuLabel}
            onChange={(e) => setNewMenuLabel(e.target.value)}
            className="form-input"
          />
          <div className="form-actions">
            <button onClick={handleCreateMenu} className="btn-primary">
              Criar
            </button>
            <button onClick={() => {
              setShowAddMenu(false);
              setNewMenuLabel('');
            }} className="btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="menus-list">
        {menus.length === 0 ? (
          <div className="empty-state">
            Nenhum menu configurado. Crie um novo menu para começar.
          </div>
        ) : (
          menus.map((menu) => (
            <div key={menu.Id || menu.id} className="menu-card">
              <div className="menu-header">
                <h3>{menu.Label || menu.label}</h3>
                <div className="menu-actions">
                  {editingMenu === menu.Id ? (
                    <>
                      <button
                        onClick={() => setEditingMenu(null)}
                        className="btn-icon"
                        title="Cancelar edição"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingMenu(menu.Id || menu.id)}
                        className="btn-icon"
                        title="Editar menu"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteMenu(menu.Id || menu.id, menu.Label || menu.label)}
                        className="btn-icon danger"
                        title="Excluir menu"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {editingMenu === menu.Id && (
                <div className="menu-edit-form">
                  <input
                    type="text"
                    value={menu.Label || menu.label || ''}
                    onChange={(e) => handleUpdateMenu(menu.Id || menu.id, {
                      ...menu,
                      Label: e.target.value,
                    })}
                    className="form-input"
                    placeholder="Label do menu"
                  />

                  <div className="menu-items">
                    <h4>Itens do Menu</h4>
                    {(menu.Items || menu.items || []).map((item, itemIndex) => (
                      <div key={itemIndex} className="menu-item">
                        <input
                          type="text"
                          value={item.Label || item.label || ''}
                          onChange={(e) => handleUpdateItem(
                            menu.Id || menu.id,
                            menu,
                            itemIndex,
                            { Label: e.target.value }
                          )}
                          className="form-input"
                          placeholder="Label do item"
                        />
                        <select
                          value={item.TutorialSlug || item.tutorialSlug || ''}
                          onChange={(e) => handleUpdateItem(
                            menu.Id || menu.id,
                            menu,
                            itemIndex,
                            { TutorialSlug: e.target.value }
                          )}
                          className="form-select"
                        >
                          <option value="">Selecione um tutorial</option>
                          {tutorials.map((tutorial) => (
                            <option key={tutorial.Id} value={tutorial.Slug || tutorial.slug}>
                              {tutorial.Title || tutorial.title}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleDeleteItem(menu.Id || menu.id, menu, itemIndex)}
                          className="btn-icon danger"
                          title="Excluir item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}

                    {editingItem === menu.Id ? (
                      <div className="add-item-form">
                        <input
                          type="text"
                          placeholder="Label do item"
                          value={newItemLabel}
                          onChange={(e) => setNewItemLabel(e.target.value)}
                          className="form-input"
                        />
                        <select
                          value={newItemTutorialSlug}
                          onChange={(e) => setNewItemTutorialSlug(e.target.value)}
                          className="form-select"
                        >
                          <option value="">Selecione um tutorial</option>
                          {tutorials.map((tutorial) => (
                            <option key={tutorial.Id} value={tutorial.Slug || tutorial.slug}>
                              {tutorial.Title || tutorial.title}
                            </option>
                          ))}
                        </select>
                        <div className="form-actions">
                          <button onClick={() => handleAddItem(menu.Id || menu.id, menu)} className="btn-primary">
                            Adicionar
                          </button>
                          <button onClick={() => {
                            setEditingItem(null);
                            setNewItemLabel('');
                            setNewItemTutorialSlug('');
                          }} className="btn-secondary">
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingItem(menu.Id || menu.id)}
                        className="btn-secondary"
                      >
                        <Plus size={16} />
                        Adicionar Item
                      </button>
                    )}
                  </div>
                </div>
              )}

              {editingMenu !== menu.Id && (
                <div className="menu-items-preview">
                  {(menu.Items || menu.items || []).length === 0 ? (
                    <p className="text-muted">Nenhum item configurado</p>
                  ) : (
                    <ul>
                      {(menu.Items || menu.items || []).map((item, index) => (
                        <li key={index}>
                          {item.Label || item.label} 
                          {item.TutorialSlug || item.tutorialSlug ? (
                            <span className="badge">Tutorial: {item.TutorialSlug || item.tutorialSlug}</span>
                          ) : (
                            <span className="badge warning">Sem tutorial</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HeaderMenuManager;

