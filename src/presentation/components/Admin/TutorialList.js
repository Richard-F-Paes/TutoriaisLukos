import React, { useState } from "react";
import "./TutorialList.css";
import { formatDate } from "../../../shared/utils/index.js";

export default function TutorialList({ tutorials, isLoading, onTutorialDeleted, onRefresh }) {
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

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

  const handleDeleteTutorial = async (tutorialId) => {
    if (!window.confirm("Tem certeza que deseja excluir este tutorial?")) {
      return;
    }

    setDeletingId(tutorialId);
    try {
      // Simular exclusão
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
      onTutorialDeleted(tutorialId);
    } catch (error) {
      console.error("Erro ao excluir tutorial:", error);
      alert("Erro ao excluir tutorial: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const getCategoryInfo = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || { name: categoryId, color: "#666" };
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner": return "#28a745";
      case "intermediate": return "#ffc107";
      case "advanced": return "#dc3545";
      default: return "#6c757d";
    }
  };

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || tutorial.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="tutorial-list-loading">
        <div className="loading-spinner"></div>
        <p>Carregando tutoriais...</p>
      </div>
    );
  }

  return (
    <div className="tutorial-list">
      <div className="tutorial-list-header">
        <h2>Tutoriais ({tutorials.length})</h2>
        <button onClick={onRefresh} className="refresh-btn">
          🔄 Atualizar
        </button>
      </div>

      <div className="tutorial-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar tutoriais..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="category-filter"
        >
          <option value="">Todas as categorias</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {filteredTutorials.length === 0 ? (
        <div className="no-tutorials">
          <div className="no-tutorials-icon">📚</div>
          <h3>Nenhum tutorial encontrado</h3>
          <p>
            {searchTerm || filterCategory 
              ? "Tente ajustar os filtros de busca" 
              : "Crie seu primeiro tutorial usando o editor"}
          </p>
        </div>
      ) : (
        <div className="tutorials-grid">
          {filteredTutorials.map(tutorial => {
            const categoryInfo = getCategoryInfo(tutorial.category);
            const difficultyColor = getDifficultyColor(tutorial.difficulty);
            
            return (
              <div key={tutorial.id} className="tutorial-card">
                <div className="tutorial-card-header">
                  <div className="tutorial-category" style={{ backgroundColor: categoryInfo.color }}>
                    {categoryInfo.name}
                  </div>
                  <div className="tutorial-actions">
                    <button
                      onClick={() => handleDeleteTutorial(tutorial.id)}
                      disabled={deletingId === tutorial.id}
                      className="delete-btn"
                      title="Excluir tutorial"
                    >
                      {deletingId === tutorial.id ? "⏳" : "🗑️"}
                    </button>
                  </div>
                </div>

                <div className="tutorial-content">
                  <h3 className="tutorial-title">{tutorial.title}</h3>
                  <p className="tutorial-description">{tutorial.description}</p>
                  
                  <div className="tutorial-meta">
                    <div className="tutorial-difficulty" style={{ color: difficultyColor }}>
                      <span className="difficulty-icon">📊</span>
                      {tutorial.difficulty}
                    </div>
                    <div className="tutorial-time">
                      <span className="time-icon">⏱️</span>
                      {tutorial.estimatedTime}
                    </div>
                    <div className="tutorial-steps">
                      <span className="steps-icon">📝</span>
                      {tutorial.steps?.length || 0} passos
                    </div>
                  </div>
                </div>

                <div className="tutorial-footer">
                  <div className="tutorial-dates">
                    <small>Criado: {formatDate(tutorial.createdAt)}</small>
                    {tutorial.updatedAt !== tutorial.createdAt && (
                      <small>Atualizado: {formatDate(tutorial.updatedAt)}</small>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
