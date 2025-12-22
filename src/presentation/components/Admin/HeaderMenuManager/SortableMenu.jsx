// SortableMenu - Menu individual arrastável
import React, { useEffect, useMemo, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit, Trash2, ChevronDown, Check, X } from 'lucide-react';

export const SortableMenu = ({ 
  menu, 
  isOpen, 
  onToggle, 
  onEdit, 
  onUpdateLabel,
  onCancelEdit,
  onDelete, 
  onAddItem,
  editingMenuId,
  children 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `menu-${menu.Id || menu.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const menuId = menu.Id || menu.id;
  const menuLabel = menu.Label || menu.label;
  const items = menu.Items || menu.items || [];

  const isEditing = editingMenuId === menuId;
  const initialLabel = useMemo(() => (menuLabel ?? ''), [menuLabel]);
  const [editLabel, setEditLabel] = useState(initialLabel);

  useEffect(() => {
    if (isEditing) {
      setEditLabel(initialLabel);
    }
  }, [isEditing, initialLabel]);

  const handleSaveLabel = async () => {
    const next = editLabel.trim();
    if (!next) return;
    await onUpdateLabel?.(menuId, next);
  };

  const handleCancelEdit = () => {
    setEditLabel(initialLabel);
    onCancelEdit?.(menuId);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`sortable-menu ${isDragging ? 'dragging' : ''} ${editingMenuId === menuId ? 'editing' : ''}`}
    >
      <div className="sortable-menu-header">
        <button
          className="drag-handle"
          {...attributes}
          {...listeners}
          aria-label="Arrastar menu"
        >
          <GripVertical size={16} />
        </button>

        {isEditing ? (
          <div className="menu-inline-edit" aria-label="Editar label do menu">
            <input
              type="text"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              className="inline-editor-input"
              placeholder="Label do menu"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSaveLabel();
                } else if (e.key === 'Escape') {
                  handleCancelEdit();
                }
              }}
            />
          </div>
        ) : (
          <button
            className="menu-toggle"
            onClick={() => onToggle(menuId)}
            aria-expanded={isOpen}
          >
            <span className="menu-label">{menuLabel}</span>
            <ChevronDown 
              size={16} 
              className={`chevron ${isOpen ? 'open' : ''}`}
            />
          </button>
        )}
        <div className="menu-actions">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveLabel}
                className="btn-icon success"
                title="Salvar"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="btn-icon"
                title="Cancelar"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onEdit(menuId)}
                className="btn-icon"
                title="Editar menu"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(menuId, menuLabel)}
                className="btn-icon danger"
                title="Excluir menu"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="sortable-menu-content">
          {children}
        </div>
      )}
    </div>
  );
};

