// HeaderMenuManager - Gerenciamento de menus do header no admin com preview e drag & drop
import React, { useState, useEffect, useRef } from 'react';
import { 
  useHeaderMenus, 
  useCreateHeaderMenu, 
  useUpdateHeaderMenu, 
  useDeleteHeaderMenu,
  useReorderHeaderMenus 
} from '../../../../hooks/useHeaderMenus';
import { useTutorials } from '../../../../hooks/useTutorials';
import { NavbarPreview } from './NavbarPreview';
import toast from 'react-hot-toast';
import { defaultHeaderMenus } from '../../../../shared/constants/defaultHeaderMenus.js';
import { Trash2, X } from 'lucide-react';
import './HeaderMenuManager.css';

const HeaderMenuManager = () => {
  const [editingMenuId, setEditingMenuId] = useState(null);
  const [addingItemMenuId, setAddingItemMenuId] = useState(null);
  const [isAddingMenu, setIsAddingMenu] = useState(false);
  const [newMenuLabel, setNewMenuLabel] = useState('');
  const [newItemLabel, setNewItemLabel] = useState('');
  const [newItemType, setNewItemType] = useState('tutorial');
  const [newItemTutorialSlug, setNewItemTutorialSlug] = useState('');
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState(null);
  const hasImportedDefaults = useRef(false);

  const { data: menusData, isLoading } = useHeaderMenus();
  const { data: tutorialsData } = useTutorials();
  const createMutation = useCreateHeaderMenu();
  const updateMutation = useUpdateHeaderMenu();
  const deleteMutation = useDeleteHeaderMenu();
  const reorderMutation = useReorderHeaderMenus();

  const menus = menusData?.data || [];
  const tutorials = tutorialsData?.data || [];

  const hasDbMenus = menus.length > 0;

  const buildDraftFromDefaults = () => {
    const mapItem = (it, itIdx) => ({
      Label: it.label,
      TutorialSlug: it.tutorialSlug ?? null,
      Order: itIdx,
      Children: (it.children || it.Children || []).map(mapItem),
    });

    return defaultHeaderMenus.map((m, idx) => ({
      id: -(idx + 1),
      Label: m.label,
      Order: idx,
      Items: (m.items || []).map(mapItem),
    }));
  };

  const [draftMenus, setDraftMenus] = useState(() => buildDraftFromDefaults());

  const currentMenus = hasDbMenus ? menus : draftMenus;

  const getItemChildren = (it) => it?.Children ?? it?.children ?? [];

  const serializeItemsTree = (items) =>
    (items || []).map((it, idx) => ({
      Label: it.Label ?? it.label,
      TutorialSlug: it.TutorialSlug ?? it.tutorialSlug ?? null,
      Order: it.Order ?? it.order ?? idx,
      Children: serializeItemsTree(getItemChildren(it)),
    }));

  const formatApiError = (error, fallback) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.error || error?.response?.data?.message || error?.message;
    if (status && message) return `${fallback} (${status}): ${message}`;
    if (message) return `${fallback}: ${message}`;
    return fallback;
  };

  const handleUpdateMenu = async (menuId, updates) => {
    // Modo rascunho: atualiza localmente
    if (!hasDbMenus || menuId < 0) {
      setDraftMenus((prev) =>
        prev.map((m) => (m.id === menuId ? { ...m, ...updates } : m))
      );
      return true;
    }
    try {
      await updateMutation.mutateAsync({ id: menuId, data: updates });
      toast.success('Menu atualizado com sucesso!');
      setEditingMenuId(null);
      return true;
    } catch (error) {
      toast.error(formatApiError(error, 'Erro ao atualizar menu'));
      return false;
    }
  };

  const handleDeleteMenuClick = (menuId, menuLabel) => {
    const menu = currentMenus.find(m => (m.Id || m.id) === menuId);
    if (menu) {
      setMenuToDelete({ id: menuId, label: menuLabel || menu.Label || menu.label });
    }
  };

  const handleConfirmDeleteMenu = async () => {
    if (!menuToDelete) return;

    const menuId = menuToDelete.id;
    const menuLabel = menuToDelete.label;

    // Modo rascunho: remove localmente
    if (!hasDbMenus || menuId < 0) {
      setDraftMenus((prev) => prev.filter((m) => m.id !== menuId));
      toast.success('Menu removido do rascunho.');
      setMenuToDelete(null);
      return;
    }

    try {
      await deleteMutation.mutateAsync(menuId);
      toast.success('Menu excluído com sucesso!');
      setMenuToDelete(null);
    } catch (error) {
      toast.error(formatApiError(error, 'Erro ao excluir menu'));
      // Não fechar o modal em caso de erro
    }
  };

  const handleCancelDeleteMenu = () => {
    setMenuToDelete(null);
  };

  const handleEditMenu = (menuId) => {
    setAddingItemMenuId(null);
    setEditingMenuId(menuId);
  };

  const handleUpdateMenuLabel = async (menuId, newLabel) => {
    const menu = currentMenus.find(m => (m.Id || m.id) === menuId);
    if (!menu) return;

    if (!newLabel.trim()) {
      toast.error('O label do menu não pode estar vazio');
      return;
    }

    const ok = await handleUpdateMenu(menuId, {
      ...menu,
      Label: newLabel,
    });

    if (ok) {
      setEditingMenuId(null);
    }
  };

  const handleCancelEditMenu = () => {
    setEditingMenuId(null);
  };

  const handleAddMenu = () => {
    setEditingMenuId(null);
    setAddingItemMenuId(null);
    setIsAddingMenu(true);
    setNewMenuLabel('');
  };

  const handleSaveMenu = async () => {
    if (!newMenuLabel.trim()) {
      toast.error('O label do menu é obrigatório');
      return;
    }

    // Modo rascunho: adiciona localmente
    if (!hasDbMenus) {
      const newMenu = {
        id: -(draftMenus.length + 1),
        Label: newMenuLabel,
        Order: draftMenus.length,
        Items: [],
      };
      setDraftMenus((prev) => [...prev, newMenu]);
      setNewMenuLabel('');
      setIsAddingMenu(false);
      toast.success('Menu adicionado ao rascunho!');
      return;
    }

    // Modo banco: cria via API
    try {
      await createMutation.mutateAsync({
        Label: newMenuLabel,
        Order: menus.length,
        Items: [],
      });
      toast.success('Menu criado com sucesso!');
      setNewMenuLabel('');
      setIsAddingMenu(false);
    } catch (error) {
      toast.error(formatApiError(error, 'Erro ao criar menu'));
    }
  };

  const handleCancelAddMenu = () => {
    setNewMenuLabel('');
    setIsAddingMenu(false);
  };

  const handleAddItem = (menuId) => {
    setEditingMenuId(null);
    setAddingItemMenuId(menuId);
    setNewItemLabel('');
    setNewItemType('tutorial');
    setNewItemTutorialSlug('');
  };

  const handleSaveItem = async (menuId) => {
    if (!newItemLabel.trim()) {
      toast.error('O label do item é obrigatório');
      return;
    }

    const menu = currentMenus.find(m => (m.Id || m.id) === menuId);
    if (!menu) return;

    const isSubmenu = newItemType === 'submenu';
    const tutorialSlug = isSubmenu ? null : (newItemTutorialSlug || null);
    
    const newItems = [
      ...(menu.Items || []),
      {
        Label: newItemLabel,
        TutorialSlug: tutorialSlug,
        IsSubmenu: isSubmenu,
        Order: (menu.Items || []).length,
        Children: [],
      },
    ];

    await handleUpdateMenu(menuId, { ...menu, Items: newItems });
    setNewItemLabel('');
    setNewItemType('tutorial');
    setNewItemTutorialSlug('');
    setAddingItemMenuId(null);
  };

  const setItemChildren = (it, children) => ({
    ...it,
    Children: children,
    children,
  });

  const updateItemAtPath = (items, path, updater) => {
    if (!Array.isArray(items) || path.length === 0) return items;
    const [idx, ...rest] = path;
    return items.map((it, i) => {
      if (i !== idx) return it;
      if (rest.length === 0) return updater(it);
      const nextChildren = updateItemAtPath(getItemChildren(it), rest, updater);
      return setItemChildren(it, nextChildren);
    });
  };

  const deleteItemAtPath = (items, path) => {
    if (!Array.isArray(items) || path.length === 0) return items;
    const [idx, ...rest] = path;
    if (rest.length === 0) {
      return items.filter((_, i) => i !== idx);
    }
    return items.map((it, i) => {
      if (i !== idx) return it;
      const nextChildren = deleteItemAtPath(getItemChildren(it), rest);
      return setItemChildren(it, nextChildren);
    });
  };

  const addChildAtPath = (items, path, child) => {
    if (!Array.isArray(items) || path.length === 0) return items;
    const [idx, ...rest] = path;
    return items.map((it, i) => {
      if (i !== idx) return it;
      if (rest.length === 0) {
        const prevChildren = getItemChildren(it);
        const hasTutorial = !!(child.TutorialSlug ?? child.tutorialSlug);
        const nextChild = {
          Label: child.Label,
          TutorialSlug: hasTutorial ? (child.TutorialSlug ?? child.tutorialSlug) : null,
          IsSubmenu: !hasTutorial || !!(child.IsSubmenu ?? child.isSubmenu ?? false),
          Order: prevChildren.length,
          Children: child.Children ?? [],
        };
        return setItemChildren(it, [...prevChildren, nextChild]);
      }
      const nextChildren = addChildAtPath(getItemChildren(it), rest, child);
      return setItemChildren(it, nextChildren);
    });
  };

  const handleUpdateItemAtPath = async (menuId, path, updates) => {
    const menu = currentMenus.find(m => (m.Id || m.id) === menuId);
    if (!menu) return;

    const newItems = updateItemAtPath(menu.Items || [], path, (it) => ({
      ...it,
      ...updates,
    }));

    await handleUpdateMenu(menuId, { ...menu, Items: newItems });
  };

  const handleDeleteItemAtPath = async (menuId, path) => {
    const menu = currentMenus.find(m => (m.Id || m.id) === menuId);
    if (!menu) return;

    const newItems = deleteItemAtPath(menu.Items || [], path);
    await handleUpdateMenu(menuId, { ...menu, Items: newItems });
  };

  const handleAddSubmenuItem = async (menuId, parentPath, child) => {
    const menu = currentMenus.find(m => (m.Id || m.id) === menuId);
    if (!menu) return;

    // Ao virar "pai", o item não deve navegar
    const clearedParent = updateItemAtPath(menu.Items || [], parentPath, (it) => ({
      ...it,
      TutorialSlug: null,
      IsSubmenu: true,
    }));

    const newItems = addChildAtPath(clearedParent, parentPath, child);
    await handleUpdateMenu(menuId, { ...menu, Items: newItems });
  };

  const handleReorderMenus = async (menuIds) => {
    // Modo rascunho: reordena localmente
    if (!hasDbMenus) {
      setDraftMenus((prev) => {
        const mapById = new Map(prev.map((m) => [m.id, m]));
        return menuIds
          .map((id, idx) => ({ ...mapById.get(id), Order: idx }))
          .filter(Boolean);
      });
      return;
    }
    try {
      await reorderMutation.mutateAsync(menuIds);
      toast.success('Menus reordenados com sucesso!');
    } catch (error) {
      toast.error(formatApiError(error, 'Erro ao reordenar menus'));
    }
  };

  const handleReorderItems = async (menuId, newItems) => {
    const menu = currentMenus.find(m => (m.Id || m.id) === menuId);
    if (!menu) return;

    // Atualizar a ordem dos itens
    const itemsWithOrder = newItems.map((item, index) => ({
      ...item,
      Order: index,
    }));

    await handleUpdateMenu(menuId, { ...menu, Items: itemsWithOrder });
  };

  const handleSaveDraftToDb = async () => {
    if (hasDbMenus) return;
    if (draftMenus.length === 0) {
      toast.error('Rascunho vazio. Adicione menus antes de salvar.');
      return;
    }

    setIsSavingDraft(true);
    try {
      const ordered = [...draftMenus].sort((a, b) => (a.Order ?? 0) - (b.Order ?? 0));
      for (let i = 0; i < ordered.length; i += 1) {
        const m = ordered[i];
        await createMutation.mutateAsync({
          Label: m.Label,
          Order: i,
          Items: serializeItemsTree(m.Items || []),
        });
      }
      toast.success('Configuração salva no banco! O navbar vai refletir em tempo real.');
      hasImportedDefaults.current = true;
    } catch (error) {
      toast.error(formatApiError(error, 'Erro ao salvar rascunho no banco'));
    } finally {
      setIsSavingDraft(false);
    }
  };

  // Importa automaticamente os menus padrão quando não há menus no banco
  useEffect(() => {
    const importDefaults = async () => {
      if (isLoading || hasDbMenus || hasImportedDefaults.current || draftMenus.length === 0) {
        return;
      }

      hasImportedDefaults.current = true;
      setIsSavingDraft(true);
      try {
        const ordered = [...draftMenus].sort((a, b) => (a.Order ?? 0) - (b.Order ?? 0));
        for (let i = 0; i < ordered.length; i += 1) {
          const m = ordered[i];
          await createMutation.mutateAsync({
            Label: m.Label,
            Order: i,
            Items: serializeItemsTree(m.Items || []),
          });
        }
        toast.success('Navbar padrão importado automaticamente!');
      } catch (error) {
        toast.error(formatApiError(error, 'Erro ao importar navbar padrão'));
        hasImportedDefaults.current = false; // Permite tentar novamente em caso de erro
      } finally {
        setIsSavingDraft(false);
      }
    };

    importDefaults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, hasDbMenus]);

  if (isLoading) {
    return <div className="loading">Carregando menus...</div>;
  }

  return (
    <div className="header-menu-manager">
      <div className="manager-header">
        <h2>Gerenciar Menus do Header</h2>
        <div className="menu-actions">
          {!hasDbMenus && (
            <button
              onClick={handleSaveDraftToDb}
              className="btn-primary"
              disabled={isSavingDraft}
              title="Persistir a configuração padrão (ou editada) no banco"
            >
              {isSavingDraft ? 'Salvando...' : 'Salvar no banco'}
            </button>
          )}
        </div>
      </div>

      {currentMenus.length > 0 && (
        <NavbarPreview
          menus={currentMenus}
          onReorderMenus={handleReorderMenus}
          onReorderItems={handleReorderItems}
          onEditMenu={handleEditMenu}
          onUpdateMenuLabel={handleUpdateMenuLabel}
          onCancelEditMenu={handleCancelEditMenu}
          onDeleteMenu={handleDeleteMenuClick}
          onAddItem={handleAddItem}
          onSaveItem={handleSaveItem}
          onCancelAddItem={() => {
            setNewItemLabel('');
            setNewItemType('tutorial');
            setNewItemTutorialSlug('');
            setAddingItemMenuId(null);
          }}
          onUpdateItemAtPath={handleUpdateItemAtPath}
          onDeleteItemAtPath={handleDeleteItemAtPath}
          onAddSubmenuItem={handleAddSubmenuItem}
          onAddMenu={handleAddMenu}
          onSaveMenu={handleSaveMenu}
          onCancelAddMenu={handleCancelAddMenu}
          editingMenuId={editingMenuId}
          addingItemMenuId={addingItemMenuId}
          isAddingMenu={isAddingMenu}
          newMenuLabel={newMenuLabel}
          setNewMenuLabel={setNewMenuLabel}
          newItemLabel={newItemLabel}
          newItemType={newItemType}
          newItemTutorialSlug={newItemTutorialSlug}
          setNewItemLabel={setNewItemLabel}
          setNewItemType={setNewItemType}
          setNewItemTutorialSlug={setNewItemTutorialSlug}
          tutorials={tutorials}
        />
      )}

      {currentMenus.length === 0 && !isLoading && (
        <div className="empty-state">
          Importando navbar padrão...
        </div>
      )}

      {/* Modal de Confirmação de Exclusão de Menu */}
      {menuToDelete && (
        <div
          className="category-form-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !deleteMutation.isPending) {
              handleCancelDeleteMenu();
            }
          }}
        >
          <div
            className="form-container"
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.75rem',
              maxWidth: '480px',
              width: '92%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="form-header"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '-0.02em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Trash2 size={20} style={{ color: '#dc2626' }} />
                Excluir menu?
              </h3>
              <button
                type="button"
                className="close-btn"
                onClick={handleCancelDeleteMenu}
                disabled={deleteMutation.isPending}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  cursor: deleteMutation.isPending ? 'not-allowed' : 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  color: '#6b7280',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!deleteMutation.isPending) {
                    e.target.style.background = '#e5e7eb';
                    e.target.style.color = '#374151';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f3f4f6';
                  e.target.style.color = '#6b7280';
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ color: '#1f2937', fontSize: '1rem', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 1.25rem 0', fontWeight: 500, color: '#111827' }}>
                Tem certeza que deseja excluir o menu{' '}
                <strong style={{ color: '#111827', fontWeight: 600 }}>
                  "{menuToDelete.label}"
                </strong>
                ?
              </p>

              {/* Avisos */}
              <div
                style={{
                  padding: '0.875rem',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ color: '#991b1b', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  <strong>⚠️ Atenção:</strong>
                  <ul style={{ margin: '0.5rem 0 0 1.25rem', padding: 0 }}>
                    <li>Todos os itens e submenus associados serão removidos.</li>
                    <li>Esta ação não pode ser desfeita.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="form-actions"
              style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'flex-end',
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid #e5e7eb',
              }}
            >
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancelDeleteMenu}
                disabled={deleteMutation.isPending}
                style={{
                  padding: '0.7rem 1.25rem',
                  background: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: deleteMutation.isPending ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!deleteMutation.isPending) {
                    e.target.style.background = '#e5e7eb';
                    e.target.style.borderColor = '#d1d5db';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f3f4f6';
                  e.target.style.borderColor = '#e5e7eb';
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleConfirmDeleteMenu}
                disabled={deleteMutation.isPending}
                style={{
                  padding: '0.7rem 1.25rem',
                  background: deleteMutation.isPending ? '#9ca3af' : '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: deleteMutation.isPending ? 'not-allowed' : 'pointer',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!deleteMutation.isPending) {
                    e.target.style.background = '#b91c1c';
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(220, 38, 38, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!deleteMutation.isPending) {
                    e.target.style.background = '#dc2626';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {deleteMutation.isPending ? 'Excluindo...' : 'Sim, excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderMenuManager;

