import React, { useState } from "react";
import "./TutorialEditor.css";

export default function TutorialEditor({ tutorials, onTutorialCreated, onTutorialUpdated }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTutorial, setEditingTutorial] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "react",
    difficulty: "beginner",
    estimatedTime: "30 min",
    steps: []
  });

  const categories = [
    { id: "react", name: "React", color: "#61dafb" },
    { id: "javascript", name: "JavaScript", color: "#f7df1e" },
    { id: "nodejs", name: "Node.js", color: "#339933" },
    { id: "css", name: "CSS", color: "#1572b6" },
    { id: "html", name: "HTML", color: "#e34f26" },
    { id: "mongodb", name: "MongoDB", color: "#47a248" },
    { id: "express", name: "Express", color: "#000000" },
    { id: "vite", name: "Vite", color: "#646cff" }
  ];

  const difficulties = [
    { id: "beginner", name: "Iniciante", color: "#28a745" },
    { id: "intermediate", name: "Intermediário", color: "#ffc107" },
    { id: "advanced", name: "Avançado", color: "#dc3545" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStepChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => 
        i === index ? { ...step, [field]: value } : step
      )
    }));
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, {
        title: "",
        description: "",
        content: "",
        videoUrl: "",
        order: prev.steps.length + 1
      }]
    }));
  };

  const removeStep = (index) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const moveStep = (index, direction) => {
    const newSteps = [...formData.steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newSteps.length) {
      [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
      // Atualizar ordem
      newSteps.forEach((step, i) => {
        step.order = i + 1;
      });
      
      setFormData(prev => ({
        ...prev,
        steps: newSteps
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (editingTutorial) {
        // Atualizar tutorial existente
        const result = await mcp.call("updateTutorial", {
          id: editingTutorial.id,
          updates: formData
        });
        
        if (result.error) {
          setError(result.error);
        } else {
          onTutorialUpdated({ ...editingTutorial, ...formData });
          resetForm();
        }
      } else {
        // Criar novo tutorial
        const result = await mcp.call("createTutorial", formData);
        
        if (result.error) {
          setError(result.error);
        } else {
          onTutorialCreated({ id: result.tutorialId, ...formData });
          resetForm();
        }
      }
    } catch (error) {
      console.error("Erro ao salvar tutorial:", error);
      setError(error.message || "Erro ao salvar tutorial");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "react",
      difficulty: "beginner",
      estimatedTime: "30 min",
      steps: []
    });
    setEditingTutorial(null);
  };

  const loadTutorialForEdit = (tutorial) => {
    setEditingTutorial(tutorial);
    setFormData({
      title: tutorial.title,
      description: tutorial.description,
      category: tutorial.category,
      difficulty: tutorial.difficulty,
      estimatedTime: tutorial.estimatedTime,
      steps: tutorial.steps || []
    });
  };

  return (
    <div className="tutorial-editor">
      <div className="editor-header">
        <h2>
          {editingTutorial ? "Editar Tutorial" : "Criar Novo Tutorial"}
        </h2>
        <div className="editor-actions">
          {editingTutorial && (
            <button onClick={resetForm} className="cancel-btn">
              ✕ Cancelar Edição
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="editor-error">
          <span className="error-icon">❌</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="tutorial-form">
        <div className="form-section">
          <h3>Informações Básicas</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Título do Tutorial *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Ex: Introdução ao React Hooks"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Categoria *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="difficulty">Dificuldade</label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="estimatedTime">Tempo Estimado</label>
              <input
                type="text"
                id="estimatedTime"
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleInputChange}
                placeholder="Ex: 45 min"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
              placeholder="Descreva o que será ensinado neste tutorial..."
            />
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h3>Passos do Tutorial</h3>
            <button type="button" onClick={addStep} className="add-step-btn">
              + Adicionar Passo
            </button>
          </div>

          {formData.steps.length === 0 ? (
            <div className="no-steps">
              <p>Nenhum passo adicionado ainda. Clique em "Adicionar Passo" para começar.</p>
            </div>
          ) : (
            <div className="steps-list">
              {formData.steps.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-header">
                    <h4>Passo {step.order}</h4>
                    <div className="step-actions">
                      <button
                        type="button"
                        onClick={() => moveStep(index, 'up')}
                        disabled={index === 0}
                        className="move-btn"
                        title="Mover para cima"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveStep(index, 'down')}
                        disabled={index === formData.steps.length - 1}
                        className="move-btn"
                        title="Mover para baixo"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="remove-btn"
                        title="Remover passo"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className="step-content">
                    <div className="form-group">
                      <label>Título do Passo</label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                        placeholder="Ex: Configurando o ambiente"
                      />
                    </div>

                    <div className="form-group">
                      <label>Descrição</label>
                      <textarea
                        value={step.description}
                        onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                        rows="2"
                        placeholder="Breve descrição do que será feito neste passo..."
                      />
                    </div>

                    <div className="form-group">
                      <label>Conteúdo Detalhado</label>
                      <textarea
                        value={step.content}
                        onChange={(e) => handleStepChange(index, 'content', e.target.value)}
                        rows="4"
                        placeholder="Conteúdo detalhado, código, explicações..."
                      />
                    </div>

                    <div className="form-group">
                      <label>URL do Vídeo (opcional)</label>
                      <input
                        type="url"
                        value={step.videoUrl}
                        onChange={(e) => handleStepChange(index, 'videoUrl', e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" onClick={resetForm} className="reset-btn">
            Limpar Formulário
          </button>
          <button 
            type="submit" 
            disabled={isLoading}
            className="submit-btn"
          >
            {isLoading ? "Salvando..." : (editingTutorial ? "Atualizar Tutorial" : "Criar Tutorial")}
          </button>
        </div>
      </form>
    </div>
  );
}
