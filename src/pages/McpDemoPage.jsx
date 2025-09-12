import React from "react";
import { useMcp } from "trae/mcp";

export default function McpDemoPage() {
  const mcp = useMcp("tutorial-agent");
  const [generatedCode, setGeneratedCode] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const generateComponent = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mcp.call("generateComponent", { 
        name: "TutorialCard", 
        withStyles: true 
      });
      if (result.error) {
        setError(result.error);
      } else {
        setGeneratedCode(prev => ({ ...prev, component: result.output }));
      }
    } catch (error) {
      console.error("Erro ao gerar componente:", error);
      setError(error.message || "Erro desconhecido ao gerar componente");
    } finally {
      setIsLoading(false);
    }
  };

  const generateStep = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mcp.call("generateTutorialStep", { 
        title: "Introdução ao React", 
        description: "Neste passo, você aprenderá os conceitos básicos do React e como criar seu primeiro componente.",
        order: 1
      });
      if (result.error) {
        setError(result.error);
      } else {
        setGeneratedCode(prev => ({ ...prev, step: result.output }));
      }
    } catch (error) {
      console.error("Erro ao gerar passo:", error);
      setError(error.message || "Erro desconhecido ao gerar passo de tutorial");
    } finally {
      setIsLoading(false);
    }
  };

  const generateHook = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mcp.call("generateHook", { name: "TutorialData" });
      if (result.error) {
        setError(result.error);
      } else {
        setGeneratedCode(prev => ({ ...prev, hook: result.output }));
      }
    } catch (error) {
      console.error("Erro ao gerar hook:", error);
      setError(error.message || "Erro desconhecido ao gerar hook");
    } finally {
      setIsLoading(false);
    }
  };

  const generateService = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mcp.call("generateService", { 
        name: "tutorial", 
        endpoint: "/api/tutorials",
        methods: ["get", "post", "put", "delete"]
      });
      if (result.error) {
        setError(result.error);
      } else {
        setGeneratedCode(prev => ({ ...prev, service: result.output }));
      }
    } catch (error) {
      console.error("Erro ao gerar service:", error);
      setError(error.message || "Erro desconhecido ao gerar service");
    } finally {
      setIsLoading(false);
    }
  };

  const generateContext = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mcp.call("generateContext", { 
        name: "Tutorial",
        initialState: {
          tutorials: [],
          currentTutorial: null,
          loading: false,
          error: null
        }
      });
      if (result.error) {
        setError(result.error);
      } else {
        setGeneratedCode(prev => ({ ...prev, context: result.output }));
      }
    } catch (error) {
      console.error("Erro ao gerar contexto:", error);
      setError(error.message || "Erro desconhecido ao gerar contexto");
    } finally {
      setIsLoading(false);
    }
  };

  const createSampleTutorial = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mcp.call("createTutorial", {
        title: "Tutorial de Exemplo - React Hooks",
        description: "Aprenda os conceitos básicos dos React Hooks com exemplos práticos.",
        category: "react",
        difficulty: "beginner",
        estimatedTime: "45 min",
        steps: [
          {
            title: "Introdução aos Hooks",
            description: "Entenda o que são React Hooks e por que foram criados.",
            content: "React Hooks são funções que permitem usar estado e outros recursos do React em componentes funcionais...",
            videoUrl: "",
            order: 1
          },
          {
            title: "useState Hook",
            description: "Aprenda a gerenciar estado em componentes funcionais.",
            content: "O useState é o hook mais básico para gerenciar estado...",
            videoUrl: "",
            order: 2
          }
        ]
      });
      
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("Tutorial criado com sucesso! ID: " + result.tutorialId);
        setTimeout(() => setSuccess(null), 5000);
      }
    } catch (error) {
      console.error("Erro ao criar tutorial:", error);
      setError(error.message || "Erro ao criar tutorial");
    } finally {
      setIsLoading(false);
    }
  };

  const listTutorials = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mcp.call("getTutorials", {});
      if (result.error) {
        setError(result.error);
      } else {
        setGeneratedCode(prev => ({ 
          ...prev, 
          tutorials: `Tutoriais encontrados: ${result.total}\n\n${JSON.stringify(result.tutorials, null, 2)}`
        }));
      }
    } catch (error) {
      console.error("Erro ao listar tutoriais:", error);
      setError(error.message || "Erro ao listar tutoriais");
    } finally {
      setIsLoading(false);
    }
  };

  const renderCodeBlock = (code, title) => {
    if (!code) return null;
    
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-auto max-h-96">
          <code>{code}</code>
        </pre>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Demonstração do MCP - Gerador de Código</h1>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          onClick={generateComponent}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Gerar Componente
        </button>
        
        <button 
          onClick={generateStep}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          Gerar Passo de Tutorial
        </button>
        
        <button 
          onClick={generateHook}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
        >
          Gerar Hook
        </button>
        
        <button 
          onClick={generateService}
          disabled={isLoading}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:bg-gray-400"
        >
          Gerar Service
        </button>
        
        <button 
          onClick={generateContext}
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
        >
          Gerar Contexto
        </button>
        
        <button 
          onClick={createSampleTutorial}
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400"
        >
          Criar Tutorial de Exemplo
        </button>
        
        <button 
          onClick={listTutorials}
          disabled={isLoading}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:bg-gray-400"
        >
          Listar Tutoriais
        </button>
      </div>
      
      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-4" role="alert">
          <strong className="font-bold">Sucesso! </strong>
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
          <strong className="font-bold">Erro! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {renderCodeBlock(generatedCode.component, "Componente Gerado")}
      {renderCodeBlock(generatedCode.step, "Passo de Tutorial Gerado")}
      {renderCodeBlock(generatedCode.hook, "Hook Gerado")}
      {renderCodeBlock(generatedCode.service, "Service Gerado")}
      {renderCodeBlock(generatedCode.context, "Contexto Gerado")}
      {renderCodeBlock(generatedCode.tutorials, "Lista de Tutoriais")}
    </div>
  );
}