// SortableMenuItem - Item individual arrastável (nível raiz) + renderização recursiva de subitens
import React, { useMemo, useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Edit, X, Check, Plus, ChevronRight, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

export const SortableMenuItem = ({ 
  item, 
  index, 
  menuId, 
  path,
  onUpdateAtPath, 
  onDeleteAtPath,
  onAddSubmenuItem,
  tutorials 
}) => {
  const children = useMemo(() => item.Children || item.children || [], [item.Children, item.children]);
  const hasChildren = children.length > 0;
  const isSubmenuFromItem = Boolean(item.IsSubmenu ?? item.isSubmenu ?? false);
  const itemType = isSubmenuFromItem || hasChildren ? 'submenu' : 'tutorial';

  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(item.Label || item.label || '');
  const [editItemType, setEditItemType] = useState(itemType);
  const [editTutorialSlug, setEditTutorialSlug] = useState(item.TutorialSlug || item.tutorialSlug || '');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [childLabel, setChildLabel] = useState('');
  const [childTutorialSlug, setChildTutorialSlug] = useState('');

  // Reset edit state quando item mudar externamente
  useEffect(() => {
    const newIsSubmenu = Boolean(item.IsSubmenu ?? item.isSubmenu ?? false);
    const newType = newIsSubmenu || hasChildren ? 'submenu' : 'tutorial';
    setEditItemType(newType);
    setEditTutorialSlug(item.TutorialSlug || item.tutorialSlug || '');
  }, [item.IsSubmenu, item.isSubmenu, item.TutorialSlug, item.tutorialSlug, hasChildren]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `item-${menuId}-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    if (!editLabel.trim()) {
      return;
    }

    // Bloquear troca para Tutorial se tiver filhos
    if (editItemType === 'tutorial' && hasChildren) {
      toast.error('Não é possível mudar para Tutorial quando há subitens. Remova os subitens primeiro.');
      setEditItemType('submenu');
      return;
    }

    const isSubmenu = editItemType === 'submenu';
    const tutorialSlug = isSubmenu ? null : (editTutorialSlug || null);

    onUpdateAtPath?.(menuId, path, {
      Label: editLabel,
      IsSubmenu: isSubmenu,
      TutorialSlug: tutorialSlug,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditLabel(item.Label || item.label || '');
    setEditItemType(itemType);
    setEditTutorialSlug(item.TutorialSlug || item.tutorialSlug || '');
    setIsEditing(false);
  };

  const handleTypeChange = (newType) => {
    if (newType === 'tutorial' && hasChildren) {
      toast.error('Não é possível mudar para Tutorial quando há subitens. Remova os subitens primeiro.');
      return;
    }
    setEditItemType(newType);
    if (newType === 'submenu') {
      setEditTutorialSlug('');
    }
  };

  const selectedTutorial = tutorials.find(
    t => (t.Slug || t.slug) === editTutorialSlug
  );

  const NestedItem = ({ node, nodePath, depth }) => {
    const nodeChildren = node.Children || node.children || [];
    const nodeHasChildren = nodeChildren.length > 0;
    const nodeIsSubmenu = Boolean(node.IsSubmenu ?? node.isSubmenu ?? false);
    const nodeType = nodeIsSubmenu || nodeHasChildren ? 'submenu' : 'tutorial';

    const [editing, setEditing] = useState(false);
    const [label, setLabel] = useState(node.Label || node.label || '');
    const [itemTypeState, setItemTypeState] = useState(nodeType);
    const [tutorialSlug, setTutorialSlug] = useState(node.TutorialSlug || node.tutorialSlug || '');
    const [expanded, setExpanded] = useState(true);
    const [addingChild, setAddingChild] = useState(false);
    const [childLabel, setChildLabel] = useState('');
    const [childTutorialSlug, setChildTutorialSlug] = useState('');

    useEffect(() => {
      const newIsSubmenu = Boolean(node.IsSubmenu ?? node.isSubmenu ?? false);
      const newType = newIsSubmenu || nodeHasChildren ? 'submenu' : 'tutorial';
      setItemTypeState(newType);
      setTutorialSlug(node.TutorialSlug || node.tutorialSlug || '');
    }, [node.IsSubmenu, node.isSubmenu, node.TutorialSlug, node.tutorialSlug, nodeHasChildren]);

    // Para itens aninhados, não usar paddingLeft no item, mas sim no container pai
    const pad = {};

    const handleNestedSave = () => {
      if (!label.trim()) return;

      if (itemTypeState === 'tutorial' && nodeHasChildren) {
        toast.error('Não é possível mudar para Tutorial quando há subitens. Remova os subitens primeiro.');
        setItemTypeState('submenu');
        return;
      }

      const isSubmenu = itemTypeState === 'submenu';
      const finalTutorialSlug = isSubmenu ? null : (tutorialSlug || null);

      onUpdateAtPath?.(menuId, nodePath, {
        Label: label,
        IsSubmenu: isSubmenu,
        TutorialSlug: finalTutorialSlug,
      });
      setEditing(false);
    };

    const handleNestedTypeChange = (newType) => {
      if (newType === 'tutorial' && nodeHasChildren) {
        toast.error('Não é possível mudar para Tutorial quando há subitens. Remova os subitens primeiro.');
        return;
      }
      setItemTypeState(newType);
      if (newType === 'submenu') {
        setTutorialSlug('');
      }
    };

    return (
      <div className={`sortable-menu-item nested ${editing ? 'editing' : ''}`} style={{ marginBottom: 4 }}>
        <div className="sortable-menu-item-row">
          <button
            className="drag-handle-item"
            aria-label="Arrastar item"
            style={{ opacity: 0.5, cursor: 'grab' }}
            title="Arrastar para reordenar"
          >
            <GripVertical size={12} />
          </button>

          {editing ? (
            <div className="item-edit-form" style={{ flex: 1 }}>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="form-input-small"
                placeholder="Label do item"
                autoFocus
              />
            <select
              value={itemTypeState}
              onChange={(e) => handleNestedTypeChange(e.target.value)}
              className="form-select-small"
            >
              <option value="tutorial">Tutorial</option>
              <option value="submenu">Submenu</option>
            </select>
            {itemTypeState === 'tutorial' && (
              <select
                value={tutorialSlug}
                onChange={(e) => setTutorialSlug(e.target.value)}
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
                onClick={handleNestedSave}
                className="btn-icon success"
                title="Salvar"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => {
                  setLabel(node.Label || node.label || '');
                  setItemTypeState(nodeType);
                  setTutorialSlug(node.TutorialSlug || node.tutorialSlug || '');
                  setEditing(false);
                }}
                className="btn-icon"
                title="Cancelar"
              >
                <X size={16} />
              </button>
              </div>
            </div>
          ) : (
            <div className="item-display" style={{ flex: 1 }}>
              <span
                className="item-label"
                onClick={() => setEditing(true)}
                title="Clique para editar"
              >
                {node.Label || node.label}
              </span>
              {(nodeIsSubmenu || nodeHasChildren) ? (
                <span className="item-tutorial-badge">submenu</span>
              ) : (node.TutorialSlug || node.tutorialSlug) ? (
                <span className="item-tutorial-badge">
                  {(() => {
                    const st = tutorials.find(t => (t.Slug || t.slug) === (node.TutorialSlug || node.tutorialSlug));
                    return st ? (st.Title || st.title) : (node.TutorialSlug || node.tutorialSlug);
                  })()}
                </span>
              ) : null}
              <div className="item-actions">
                {(nodeIsSubmenu || nodeHasChildren) && (
                  <>
                    <button
                      type="button"
                      onClick={() => setExpanded((v) => !v)}
                      className="btn-icon-small"
                      title={expanded ? 'Recolher' : 'Expandir'}
                      disabled={!nodeHasChildren}
                      style={{ opacity: nodeHasChildren ? 1 : 0.3 }}
                    >
                      {nodeHasChildren ? (expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />) : <ChevronRight size={14} />}
                    </button>
                    <button
                      onClick={() => setAddingChild((v) => !v)}
                      className="btn-icon-small"
                      title="Adicionar submenu"
                    >
                      <Plus size={14} />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setEditing(true)}
                  className="btn-icon-small"
                  title="Editar item"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => onDeleteAtPath?.(menuId, nodePath)}
                  className="btn-icon-small danger"
                  title="Excluir item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {addingChild && (nodeIsSubmenu || nodeHasChildren) && (
          <div className="item-edit-form" style={{ marginTop: 8, width: '100%', paddingLeft: 28 }}>
            <input
              type="text"
              value={childLabel}
              onChange={(e) => setChildLabel(e.target.value)}
              className="form-input-small"
              placeholder="Label do submenu"
              autoFocus
            />
            <select
              value={childTutorialSlug}
              onChange={(e) => setChildTutorialSlug(e.target.value)}
              className="form-select-small"
              title="Opcional: se vazio, vira submenu (pai)"
            >
              <option value="">(Sem tutorial) — vira submenu</option>
              {tutorials.map((tutorial) => (
                <option key={tutorial.Id || tutorial.id} value={tutorial.Slug || tutorial.slug}>
                  {tutorial.Title || tutorial.title}
                </option>
              ))}
            </select>
            <div className="item-edit-actions">
              <button
                onClick={() => {
                  if (!childLabel.trim()) return;
                  onAddSubmenuItem?.(menuId, nodePath, {
                    Label: childLabel.trim(),
                    TutorialSlug: childTutorialSlug || null,
                    IsSubmenu: !childTutorialSlug,
                    Children: [],
                  });
                  setChildLabel('');
                  setChildTutorialSlug('');
                  setAddingChild(false);
                  setExpanded(true);
                }}
                className="btn-icon success"
                title="Salvar"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => {
                  setChildLabel('');
                  setChildTutorialSlug('');
                  setAddingChild(false);
                }}
                className="btn-icon"
                title="Cancelar"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {expanded && nodeHasChildren && (
          <div style={{ 
            width: '100%', 
            marginTop: 6,
            marginLeft: 8,
            paddingLeft: 12,
            borderLeft: '2px solid rgba(212, 179, 255, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}>
            {nodeChildren.map((ch, i) => (
              <NestedItem
                key={`${nodePath.join('-')}-${i}`}
                node={ch}
                nodePath={[...nodePath, i]}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`sortable-menu-item ${isDragging ? 'dragging' : ''} ${isEditing ? 'editing' : ''}`}
    >
      <div className="sortable-menu-item-row">
        <button
          className="drag-handle-item"
          {...attributes}
          {...listeners}
          aria-label="Arrastar item"
        >
          <GripVertical size={14} />
        </button>
        
        {isEditing ? (
          <div className="item-edit-form" style={{ flex: 1 }}>
          <input
            type="text"
            value={editLabel}
            onChange={(e) => setEditLabel(e.target.value)}
            className="form-input-small"
            placeholder="Label do item"
            autoFocus
          />
          <select
            value={editItemType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="form-select-small"
          >
            <option value="tutorial">Tutorial</option>
            <option value="submenu">Submenu</option>
          </select>
          {editItemType === 'tutorial' && (
            <select
              value={editTutorialSlug}
              onChange={(e) => setEditTutorialSlug(e.target.value)}
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
              onClick={handleSave}
              className="btn-icon success"
              title="Salvar"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="btn-icon"
              title="Cancelar"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="item-display" style={{ flex: 1 }}>
            <span 
              className="item-label"
              onClick={() => setIsEditing(true)}
              title="Clique para editar"
            >
              {item.Label || item.label}
            </span>
            {(isSubmenuFromItem || hasChildren) ? (
              <span className="item-tutorial-badge">submenu</span>
            ) : item.TutorialSlug || item.tutorialSlug ? (
              <span className="item-tutorial-badge">
                {selectedTutorial ? (selectedTutorial.Title || selectedTutorial.title) : (item.TutorialSlug || item.tutorialSlug)}
              </span>
            ) : null}
            <div className="item-actions">
              {(isSubmenuFromItem || hasChildren) && (
                <button
                  type="button"
                  onClick={() => setIsExpanded((v) => !v)}
                  className="btn-icon-small"
                  title={isExpanded ? 'Recolher submenus' : 'Expandir submenus'}
                >
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              )}
              <button
                onClick={() => setIsEditing(true)}
                className="btn-icon-small"
                title="Editar item"
              >
                <Edit size={14} />
              </button>
              {(isSubmenuFromItem || hasChildren) && (
                <button
                  onClick={() => setIsAddingChild((v) => !v)}
                  className="btn-icon-small"
                  title="Adicionar submenu"
                >
                  <Plus size={14} />
                </button>
              )}
              <button
                onClick={() => onDeleteAtPath?.(menuId, path)}
                className="btn-icon-small danger"
                title="Excluir item"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </>
      )}
      </div>

      {isAddingChild && (isSubmenuFromItem || hasChildren) && (
        <div className="item-edit-form" style={{ marginTop: 8, width: '100%', paddingLeft: 28 }}>
          <input
            type="text"
            value={childLabel}
            onChange={(e) => setChildLabel(e.target.value)}
            className="form-input-small"
            placeholder="Label do submenu"
            autoFocus
          />
          <select
            value={childTutorialSlug}
            onChange={(e) => setChildTutorialSlug(e.target.value)}
            className="form-select-small"
            title="Opcional: se vazio, vira submenu (pai)"
          >
            <option value="">(Sem tutorial) — vira submenu</option>
            {tutorials.map((tutorial) => (
              <option key={tutorial.Id || tutorial.id} value={tutorial.Slug || tutorial.slug}>
                {tutorial.Title || tutorial.title}
              </option>
            ))}
          </select>
          <div className="item-edit-actions">
            <button
              onClick={() => {
                if (!childLabel.trim()) return;
                onAddSubmenuItem?.(menuId, path, {
                  Label: childLabel.trim(),
                  TutorialSlug: childTutorialSlug || null,
                  IsSubmenu: !childTutorialSlug,
                  Children: [],
                });
                setChildLabel('');
                setChildTutorialSlug('');
                setIsAddingChild(false);
                setIsExpanded(true);
              }}
              className="btn-icon success"
              title="Salvar"
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => {
                setChildLabel('');
                setChildTutorialSlug('');
                setIsAddingChild(false);
              }}
              className="btn-icon"
              title="Cancelar"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {hasChildren && isExpanded && (
        <div style={{ 
          width: '100%', 
          marginTop: 8,
          paddingLeft: 12, 
          borderLeft: '2px solid rgba(212, 179, 255, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}>
          {children.map((ch, i) => (
            <NestedItem key={`${index}-${i}`} node={ch} nodePath={[...path, i]} depth={1} />
          ))}
        </div>
      )}
    </div>
  );
};
