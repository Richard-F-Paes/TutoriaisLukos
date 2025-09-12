import React, { useState, useEffect } from "react";
// import { useMcp } from "trae/mcp"; // Removido - não implementado
import TutorialEditor from "../components/Admin/TutorialEditor";
import TutorialList from "../components/Admin/TutorialList";
import FileManager from "../components/Admin/FileManager";
import "./AdminPage.css";

export default function AdminPage() {
  const mcp = useMcp("tutorial-agent");
  const [activeTab, setActiveTab] = useState("tutorials");
  const [tutorials, setTutorials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Carregar tutoriais ao montar o componente
  useEffect(() => {
    loadTutorials();
  }, []);

  const loadTutorials = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mcp.call("getTutorials", {});
      if (result.error) {
        setError(result.error);
      } else {
        setTutorials(result.tutorials || []);
      }
    } catch (error) {
      console.error("Erro ao carregar tutoriais:", error);
      setError(error.message || "Erro ao carregar tutoriais");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTutorialCreated = (newTutorial) => {
    setTutorials(prev => [newTutorial, ...prev]);
    setSuccess("Tutorial criado com sucesso!");
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleTutorialUpdated = (updatedTutorial) => {
    setTutorials(prev => 
      prev.map(t => t.id === updatedTutorial.id ? updatedTutorial : t)
    );
    setSuccess("Tutorial atualizado com sucesso!");
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleTutorialDeleted = (tutorialId) => {
    setTutorials(prev => prev.filter(t => t.id !== tutorialId));
    setSuccess("Tutorial removido com sucesso!");
    setTimeout(() => setSuccess(null), 3000);
  };

  const tabs = [
    { id: "tutorials", label: "Tutoriais", icon: "📚" },
    { id: "editor", label: "Editor", icon: "✏️" },
    { id: "files", label: "Arquivos", icon: "📁" },
    { id: "settings", label: "Configurações", icon: "⚙️" }
  ];

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Painel Administrativo</h1>
        <p>Gerencie tutoriais, arquivos e configurações do sistema</p>
      </div>

      <div className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {success && (
        <div className="admin-success">
          <span className="success-icon">✅</span>
          {success}
        </div>
      )}

      {error && (
        <div className="admin-error">
          <span className="error-icon">❌</span>
          {error}
        </div>
      )}

      <div className="admin-content">
        {activeTab === "tutorials" && (
          <TutorialList
            tutorials={tutorials}
            isLoading={isLoading}
            onTutorialDeleted={handleTutorialDeleted}
            onRefresh={loadTutorials}
          />
        )}

        {activeTab === "editor" && (
          <TutorialEditor
            tutorials={tutorials}
            onTutorialCreated={handleTutorialCreated}
            onTutorialUpdated={handleTutorialUpdated}
          />
        )}

        {activeTab === "files" && (
          <FileManager />
        )}

        {activeTab === "settings" && (
          <div className="settings-panel">
            <h2>Configurações do Sistema</h2>
            <div className="settings-grid">
              <div className="setting-card">
                <h3>Backup Automático</h3>
                <p>Fazer backup dos tutoriais diariamente</p>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="setting-card">
                <h3>Hot Reload</h3>
                <p>Recarregar automaticamente quando arquivos mudarem</p>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="setting-card">
                <h3>Validação de Código</h3>
                <p>Validar código gerado automaticamente</p>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
