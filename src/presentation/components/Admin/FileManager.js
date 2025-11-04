import React, { useState, useEffect } from "react";
import "./FileManager.css";

export default function FileManager() {
  const [currentDirectory, setCurrentDirectory] = useState("src");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [showCreateFile, setShowCreateFile] = useState(false);

  useEffect(() => {
    loadFiles();
  }, [currentDirectory]);

  const loadFiles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simular carregamento de arquivos
      await new Promise(resolve => setTimeout(resolve, 800)); // Simular delay
      setFiles([
        { name: "presentation", type: "directory", path: "src/presentation" },
        { name: "infrastructure", type: "directory", path: "src/infrastructure" },
        { name: "shared", type: "directory", path: "src/shared" },
        { name: "App.jsx", type: "file", path: "src/app/App.jsx" },
        { name: "index.js", type: "file", path: "src/index.js" }
      ]);
    } catch (error) {
      console.error("Erro ao carregar arquivos:", error);
      setError("Erro ao carregar arquivos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileClick = async (file) => {
    if (file.type === 'directory') {
      setCurrentDirectory(file.path);
      setSelectedFile(null);
      setFileContent("");
    } else {
      setSelectedFile(file);
      setIsEditing(false);
      // Aqui você poderia implementar a leitura do arquivo se necessário
      setFileContent("// Conteúdo do arquivo será carregado aqui");
    }
  };

  const handleCreateFile = async () => {
    if (!newFileName.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      // Simular criação de arquivo
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
      setNewFileName("");
      setShowCreateFile(false);
      loadFiles();
    } catch (error) {
      console.error("Erro ao criar arquivo:", error);
      setError("Erro ao criar arquivo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFile = async (file) => {
    if (!window.confirm(`Tem certeza que deseja excluir ${file.name}?`)) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // Simular exclusão de arquivo
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
      if (selectedFile && selectedFile.path === file.path) {
        setSelectedFile(null);
        setFileContent("");
      }
      loadFiles();
    } catch (error) {
      console.error("Erro ao excluir arquivo:", error);
      setError("Erro ao excluir arquivo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFile = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    try {
      // Simular salvamento de arquivo
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
      setIsEditing(false);
      loadFiles();
    } catch (error) {
      console.error("Erro ao salvar arquivo:", error);
      setError("Erro ao salvar arquivo");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateUp = () => {
    const pathParts = currentDirectory.split('/');
    if (pathParts.length > 1) {
      pathParts.pop();
      setCurrentDirectory(pathParts.join('/'));
    }
  };

  const getFileIcon = (file) => {
    if (file.type === 'directory') return '📁';
    
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'js':
      case 'jsx':
        return '⚛️';
      case 'css':
        return '🎨';
      case 'html':
        return '🌐';
      case 'json':
        return '📋';
      case 'md':
        return '📝';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return '🖼️';
      default:
        return '📄';
    }
  };

  return (
    <div className="file-manager">
      <div className="file-manager-header">
        <h2>Gerenciador de Arquivos</h2>
        <div className="file-actions">
          <button onClick={loadFiles} className="refresh-btn">
            🔄 Atualizar
          </button>
          <button 
            onClick={() => setShowCreateFile(true)} 
            className="create-btn"
          >
            + Novo Arquivo
          </button>
        </div>
      </div>

      {error && (
        <div className="file-manager-error">
          <span className="error-icon">❌</span>
          {error}
        </div>
      )}

      <div className="file-manager-content">
        <div className="file-explorer">
          <div className="directory-header">
            <button 
              onClick={navigateUp} 
              className="navigate-up-btn"
              disabled={currentDirectory === 'src'}
            >
              ⬆️ Voltar
            </button>
            <span className="current-path">📁 {currentDirectory}</span>
          </div>

          {isLoading ? (
            <div className="file-list-loading">
              <div className="loading-spinner"></div>
              <p>Carregando arquivos...</p>
            </div>
          ) : (
            <div className="file-list">
              {files.length === 0 ? (
                <div className="no-files">
                  <p>Nenhum arquivo encontrado neste diretório.</p>
                </div>
              ) : (
                files.map(file => (
                  <div 
                    key={file.path} 
                    className={`file-item ${selectedFile?.path === file.path ? 'selected' : ''}`}
                    onClick={() => handleFileClick(file)}
                  >
                    <div className="file-info">
                      <span className="file-icon">{getFileIcon(file)}</span>
                      <span className="file-name">{file.name}</span>
                      <span className="file-type">{file.type}</span>
                    </div>
                    <div className="file-actions">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(file);
                        }}
                        className="delete-file-btn"
                        title="Excluir arquivo"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="file-editor">
          {selectedFile ? (
            <div className="editor-content">
              <div className="editor-header">
                <h3>{selectedFile.name}</h3>
                <div className="editor-actions">
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="edit-btn"
                    >
                      ✏️ Editar
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="cancel-btn"
                      >
                        ✕ Cancelar
                      </button>
                      <button 
                        onClick={handleSaveFile}
                        disabled={isLoading}
                        className="save-btn"
                      >
                        💾 Salvar
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="editor-body">
                {isEditing ? (
                  <textarea
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    className="file-textarea"
                    placeholder="Digite o conteúdo do arquivo..."
                  />
                ) : (
                  <pre className="file-preview">
                    <code>{fileContent}</code>
                  </pre>
                )}
              </div>
            </div>
          ) : (
            <div className="no-file-selected">
              <div className="no-file-icon">📄</div>
              <h3>Nenhum arquivo selecionado</h3>
              <p>Clique em um arquivo na lista para visualizar ou editar seu conteúdo.</p>
            </div>
          )}
        </div>
      </div>

      {showCreateFile && (
        <div className="create-file-modal">
          <div className="modal-content">
            <h3>Criar Novo Arquivo</h3>
            <div className="modal-body">
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="Nome do arquivo (ex: novo-arquivo.js)"
                className="file-name-input"
              />
              <p className="file-path-preview">
                Caminho: {currentDirectory}/{newFileName}
              </p>
            </div>
            <div className="modal-actions">
              <button 
                onClick={() => {
                  setShowCreateFile(false);
                  setNewFileName("");
                }}
                className="cancel-btn"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreateFile}
                disabled={!newFileName.trim() || isLoading}
                className="create-btn"
              >
                {isLoading ? "Criando..." : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
