// NavbarPreview - Preview visual do navbar editável
import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableMenu } from './SortableMenu';
import { SortableMenuItem } from './SortableMenuItem';
import { Plus, X, Check } from 'lucide-react';
import './NavbarPreview.css';

export const NavbarPreview = ({ 
  menus, 
  onReorderMenus, 
  onReorderItems,
  onEditMenu,
  onUpdateMenuLabel,
  onCancelEditMenu,
  onDeleteMenu,
  onAddItem,
  onSaveItem,
  onCancelAddItem,
  onUpdateItemAtPath,
  onDeleteItemAtPath,
  onAddSubmenuItem,
  onAddMenu,
  onSaveMenu,
  onCancelAddMenu,
  editingMenuId,
  addingItemMenuId,
  isAddingMenu,
  newMenuLabel,
  setNewMenuLabel,
  newItemLabel,
  newItemType,
  newItemTutorialSlug,
  setNewItemLabel,
  setNewItemType,
  setNewItemTutorialSlug,
  tutorials 
}) => {
  const [openMenus, setOpenMenus] = useState({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    // Reordenar menus
    if (active.id.toString().startsWith('menu-') && over.id.toString().startsWith('menu-')) {
      const oldIndex = menus.findIndex(m => `menu-${m.Id || m.id}` === active.id);
      const newIndex = menus.findIndex(m => `menu-${m.Id || m.id}` === over.id);

      if (oldIndex !== newIndex) {
        const newMenus = arrayMove(menus, oldIndex, newIndex);
        onReorderMenus(newMenus.map(m => m.Id || m.id));
      }
      return;
    }

    // Reordenar itens dentro de um menu
    if (active.id.toString().startsWith('item-') && over.id.toString().startsWith('item-')) {
      const activeMatch = active.id.toString().match(/item-(-?\d+)-(\d+)/);
      const overMatch = over.id.toString().match(/item-(-?\d+)-(\d+)/);

      if (activeMatch && overMatch && activeMatch[1] === overMatch[1]) {
        const menuId = parseInt(activeMatch[1]);
        const oldIndex = parseInt(activeMatch[2]);
        const newIndex = parseInt(overMatch[2]);

        const menu = menus.find(m => (m.Id || m.id) === menuId);
        if (menu) {
          const items = [...(menu.Items || menu.items || [])];
          const newItems = arrayMove(items, oldIndex, newIndex);
          onReorderItems(menuId, newItems);
        }
      }
    }
  };

  const handleToggleMenu = (menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  // Removido handleMenuItemClick - não é necessário no preview de edição

  const menuIds = menus.map(m => `menu-${m.Id || m.id}`);

  return (
    <div className="navbar-preview-container">
      <div className="navbar-preview-header">
        <h3>Preview do Navbar</h3>
        <p className="preview-subtitle">Arraste para reordenar • Clique para editar</p>
      </div>
      
      <div className="navbar-preview">
        <nav className="category-navbar-menu-preview" role="navigation" aria-label="Preview do menu de categorias">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={menuIds} strategy={horizontalListSortingStrategy}>
              {menus.map((menu) => {
                const menuId = menu.Id || menu.id;
                const isOpen = openMenus[menuId] || false;
                const items = menu.Items || menu.items || [];

                return (
                  <SortableMenu
                    key={menuId}
                    menu={menu}
                    isOpen={isOpen}
                    onToggle={handleToggleMenu}
                    onEdit={onEditMenu}
                    onUpdateLabel={onUpdateMenuLabel}
                    onCancelEdit={onCancelEditMenu}
                    onDelete={onDeleteMenu}
                    onAddItem={onAddItem}
                    editingMenuId={editingMenuId}
                  >
                    <div className="menu-items-dropdown-preview">
                      <SortableContext
                        items={items.map((_, idx) => `item-${menuId}-${idx}`)}
                        strategy={verticalListSortingStrategy}
                      >
                        {items.map((item, itemIndex) => (
                          <SortableMenuItem
                            key={itemIndex}
                            item={item}
                            index={itemIndex}
                            menuId={menuId}
                            path={[itemIndex]}
                            onUpdateAtPath={onUpdateItemAtPath}
                            onDeleteAtPath={onDeleteItemAtPath}
                            onAddSubmenuItem={onAddSubmenuItem}
                            tutorials={tutorials}
                          />
                        ))}
                      </SortableContext>
                      {items.length === 0 && (
                        <div className="empty-items-message">
                          Nenhum item. Use o botão "Adicionar Item" abaixo para começar.
                        </div>
                      )}
                      {addingItemMenuId === menuId ? (
                        <div className="sortable-menu-item" style={{ marginTop: 8 }}>
                          <div className="item-edit-form">
                            <input
                              type="text"
                              value={newItemLabel}
                              onChange={(e) => setNewItemLabel(e.target.value)}
                              className="form-input-small"
                              placeholder="Label do item"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  onSaveItem(menuId);
                                } else if (e.key === 'Escape') {
                                  onCancelAddItem();
                                }
                              }}
                              autoFocus
                            />
                            <select
                              value={newItemType}
                              onChange={(e) => {
                                setNewItemType(e.target.value);
                                if (e.target.value === 'submenu') {
                                  setNewItemTutorialSlug('');
                                }
                              }}
                              className="form-select-small"
                            >
                              <option value="tutorial">Tutorial</option>
                              <option value="submenu">Submenu</option>
                            </select>
                            {newItemType === 'tutorial' && (
                              <select
                                value={newItemTutorialSlug}
                                onChange={(e) => setNewItemTutorialSlug(e.target.value)}
                                className="form-select-small"
                              >
                                <option value="">Selecione um tutorial</option>
                                {tutorials.map((tutorial) => (
                                  <option key={tutorial.Id || tutorial.id} value={tutorial.Slug || tutorial.slug}>
                                    {tutorial.Title || tutorial.title}
                                  </option>
                                ))}
                              </select>
                            )}
                            <div className="item-edit-actions">
                              <button
                                onClick={() => onSaveItem(menuId)}
                                className="btn-icon success"
                                title="Salvar"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={onCancelAddItem}
                                className="btn-icon"
                                title="Cancelar"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => onAddItem(menuId)}
                          className="btn-add-item"
                        >
                          <Plus size={16} />
                          Adicionar Item
                        </button>
                      )}
                    </div>
                  </SortableMenu>
                );
              })}
            </SortableContext>
          </DndContext>
        </nav>
        {isAddingMenu ? (
          <div className="add-menu-form">
            <div>
              <input
                type="text"
                value={newMenuLabel}
                onChange={(e) => setNewMenuLabel(e.target.value)}
                className="form-input-small"
                placeholder="Nome do menu"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSaveMenu();
                  } else if (e.key === 'Escape') {
                    onCancelAddMenu();
                  }
                }}
                autoFocus
                style={{ flex: '1', minWidth: '200px' }}
              />
              <button
                onClick={onSaveMenu}
                className="btn-icon success"
                title="Salvar"
              >
                <Check size={16} />
              </button>
              <button
                onClick={onCancelAddMenu}
                className="btn-icon"
                title="Cancelar"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={onAddMenu}
            className="btn-add-menu"
            style={{ marginTop: '1rem' }}
          >
            <Plus size={16} />
            Adicionar Menu
          </button>
        )}
      </div>
    </div>
  );
};

