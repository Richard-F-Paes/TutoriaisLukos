import React, { useState } from 'react';
import { useEditor } from '../../../contexts/EditorContext';
import { ChromePicker } from 'react-color';
import './PropertyPanel.css';

const PropertyPanel = () => {
  const { selectedElement, updateElement } = useEditor();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPickerType, setColorPickerType] = useState('');

  if (!selectedElement) {
    return (
      <div className="property-panel">
        <div className="panel-header">
          <h3>Propriedades</h3>
        </div>
        <div className="panel-content">
          <div className="no-selection">
            <i className="fas fa-mouse-pointer"></i>
            <p>Selecione um elemento para editar suas propriedades</p>
          </div>
        </div>
      </div>
    );
  }

  const handleStyleChange = (property, value) => {
    updateElement(selectedElement.id, {
      styles: {
        ...selectedElement.styles,
        [property]: value
      }
    });
  };

  const handlePropChange = (property, value) => {
    updateElement(selectedElement.id, {
      props: {
        ...selectedElement.props,
        [property]: value
      }
    });
  };

  const handleContentChange = (content) => {
    updateElement(selectedElement.id, { content });
  };

  const openColorPicker = (type) => {
    setColorPickerType(type);
    setShowColorPicker(true);
  };

  const handleColorChange = (color) => {
    const colorValue = color.hex;
    handleStyleChange(colorPickerType, colorValue);
  };

  const getCurrentColor = () => {
    return selectedElement.styles[colorPickerType] || '#000000';
  };

  return (
    <div className="property-panel">
      <div className="panel-header">
        <h3>Propriedades</h3>
        <div className="element-info">
          <span className="element-type">{selectedElement.type}</span>
          <span className="element-id">#{selectedElement.id.slice(-6)}</span>
        </div>
      </div>

      <div className="panel-content">
        {/* Conteúdo do elemento */}
        {selectedElement.content !== undefined && (
          <div className="property-group">
            <label>Conteúdo</label>
            <textarea
              value={selectedElement.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="property-input"
              rows={3}
              placeholder="Digite o conteúdo..."
            />
          </div>
        )}

        {/* Estilos de texto */}
        <div className="property-group">
          <h4>Tipografia</h4>
          
          <div className="property-row">
            <label>Tamanho da fonte</label>
            <input
              type="text"
              value={selectedElement.styles.fontSize || ''}
              onChange={(e) => handleStyleChange('fontSize', e.target.value)}
              className="property-input"
              placeholder="16px"
            />
          </div>

          <div className="property-row">
            <label>Peso da fonte</label>
            <select
              value={selectedElement.styles.fontWeight || ''}
              onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
              className="property-select"
            >
              <option value="">Normal</option>
              <option value="bold">Negrito</option>
              <option value="lighter">Mais leve</option>
              <option value="bolder">Mais pesado</option>
            </select>
          </div>

          <div className="property-row">
            <label>Cor do texto</label>
            <div className="color-input-group">
              <input
                type="text"
                value={selectedElement.styles.color || ''}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="property-input"
                placeholder="#000000"
              />
              <button
                type="button"
                className="color-picker-btn"
                onClick={() => openColorPicker('color')}
                style={{ backgroundColor: selectedElement.styles.color || '#000000' }}
              >
                <i className="fas fa-palette"></i>
              </button>
            </div>
          </div>

          <div className="property-row">
            <label>Alinhamento</label>
            <select
              value={selectedElement.styles.textAlign || ''}
              onChange={(e) => handleStyleChange('textAlign', e.target.value)}
              className="property-select"
            >
              <option value="">Esquerda</option>
              <option value="center">Centro</option>
              <option value="right">Direita</option>
              <option value="justify">Justificado</option>
            </select>
          </div>
        </div>

        {/* Estilos de layout */}
        <div className="property-group">
          <h4>Layout</h4>
          
          <div className="property-row">
            <label>Largura</label>
            <input
              type="text"
              value={selectedElement.styles.width || ''}
              onChange={(e) => handleStyleChange('width', e.target.value)}
              className="property-input"
              placeholder="auto, 100%, 300px"
            />
          </div>

          <div className="property-row">
            <label>Altura</label>
            <input
              type="text"
              value={selectedElement.styles.height || ''}
              onChange={(e) => handleStyleChange('height', e.target.value)}
              className="property-input"
              placeholder="auto, 100%, 200px"
            />
          </div>

          <div className="property-row">
            <label>Margem</label>
            <input
              type="text"
              value={selectedElement.styles.margin || ''}
              onChange={(e) => handleStyleChange('margin', e.target.value)}
              className="property-input"
              placeholder="10px, 10px 20px"
            />
          </div>

          <div className="property-row">
            <label>Preenchimento</label>
            <input
              type="text"
              value={selectedElement.styles.padding || ''}
              onChange={(e) => handleStyleChange('padding', e.target.value)}
              className="property-input"
              placeholder="10px, 10px 20px"
            />
          </div>
        </div>

        {/* Estilos de aparência */}
        <div className="property-group">
          <h4>Aparência</h4>
          
          <div className="property-row">
            <label>Cor de fundo</label>
            <div className="color-input-group">
              <input
                type="text"
                value={selectedElement.styles.backgroundColor || ''}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                className="property-input"
                placeholder="#ffffff"
              />
              <button
                type="button"
                className="color-picker-btn"
                onClick={() => openColorPicker('backgroundColor')}
                style={{ backgroundColor: selectedElement.styles.backgroundColor || '#ffffff' }}
              >
                <i className="fas fa-palette"></i>
              </button>
            </div>
          </div>

          <div className="property-row">
            <label>Borda</label>
            <input
              type="text"
              value={selectedElement.styles.border || ''}
              onChange={(e) => handleStyleChange('border', e.target.value)}
              className="property-input"
              placeholder="1px solid #ccc"
            />
          </div>

          <div className="property-row">
            <label>Raio da borda</label>
            <input
              type="text"
              value={selectedElement.styles.borderRadius || ''}
              onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
              className="property-input"
              placeholder="4px, 50%"
            />
          </div>

          <div className="property-row">
            <label>Sombra</label>
            <input
              type="text"
              value={selectedElement.styles.boxShadow || ''}
              onChange={(e) => handleStyleChange('boxShadow', e.target.value)}
              className="property-input"
              placeholder="0 2px 4px rgba(0,0,0,0.1)"
            />
          </div>
        </div>

        {/* Propriedades específicas */}
        {selectedElement.type === 'img' && (
          <div className="property-group">
            <h4>Imagem</h4>
            
            <div className="property-row">
              <label>URL da imagem</label>
              <input
                type="url"
                value={selectedElement.props.src || ''}
                onChange={(e) => handlePropChange('src', e.target.value)}
                className="property-input"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div className="property-row">
              <label>Texto alternativo</label>
              <input
                type="text"
                value={selectedElement.props.alt || ''}
                onChange={(e) => handlePropChange('alt', e.target.value)}
                className="property-input"
                placeholder="Descrição da imagem"
              />
            </div>
          </div>
        )}

        {selectedElement.type === 'button' && (
          <div className="property-group">
            <h4>Botão</h4>
            
            <div className="property-row">
              <label>Tipo</label>
              <select
                value={selectedElement.props.type || 'button'}
                onChange={(e) => handlePropChange('type', e.target.value)}
                className="property-select"
              >
                <option value="button">Botão</option>
                <option value="submit">Enviar</option>
                <option value="reset">Resetar</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Color Picker Modal */}
      {showColorPicker && (
        <div className="color-picker-modal">
          <div className="color-picker-overlay" onClick={() => setShowColorPicker(false)}>
            <div className="color-picker-container" onClick={(e) => e.stopPropagation()}>
              <div className="color-picker-header">
                <h4>Selecionar Cor</h4>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setShowColorPicker(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <ChromePicker
                color={getCurrentColor()}
                onChange={handleColorChange}
                disableAlpha={false}
              />
              <div className="color-picker-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowColorPicker(false)}
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyPanel;
