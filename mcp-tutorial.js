#!/usr/bin/env node
import readline from "readline";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sendResponse(id, result) {
  process.stdout.write(JSON.stringify({ id, result }) + "\n");
}

process.stdin.on("data", (chunk) => {
  let req;
  try {
    req = JSON.parse(chunk.toString());
  } catch (error) {
    console.error("Erro ao analisar JSON da requisição:", error);
    return;
  }

  if (!req.id) {
    console.error("Requisição sem ID");
    return;
  }

  if (req.method === "getTools") {
    sendResponse(req.id, {
      tools: [
        {
          name: "generateComponent",
          description: "Gera um componente React para tutoriais com Tailwind.",
          inputSchema: {
            type: "object",
            properties: { 
              name: { type: "string" },
              withStyles: { type: "boolean", default: true }
            },
            required: ["name"]
          }
        },
        {
          name: "generateTutorialStep",
          description: "Gera um componente de passo para tutoriais.",
          inputSchema: {
            type: "object",
            properties: { 
              title: { type: "string" },
              description: { type: "string" },
              order: { type: "number" }
            },
            required: ["title", "description"]
          }
        },
        {
          name: "generateHook",
          description: "Gera um hook React customizado para tutoriais.",
          inputSchema: {
            type: "object",
            properties: { name: { type: "string" } },
            required: ["name"]
          }
        },
        {
          name: "generateService",
          description: "Gera um service de API com Axios para tutoriais.",
          inputSchema: {
            type: "object",
            properties: { 
              name: { type: "string" }, 
              endpoint: { type: "string" },
              methods: { 
                type: "array", 
                items: { 
                  type: "string", 
                  enum: ["get", "post", "put", "delete"] 
                },
                default: ["get"]
              }
            },
            required: ["name", "endpoint"]
          }
        },
        {
          name: "generateContext",
          description: "Gera um contexto React para gerenciamento de estado.",
          inputSchema: {
            type: "object",
            properties: { 
              name: { type: "string" },
              initialState: { type: "object" }
            },
            required: ["name"]
          }
        },
        {
          name: "createTutorial",
          description: "Cria um novo tutorial completo no sistema.",
          inputSchema: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              category: { type: "string" },
              difficulty: { type: "string", enum: ["beginner", "intermediate", "advanced"] },
              estimatedTime: { type: "string" },
              steps: { 
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    content: { type: "string" },
                    videoUrl: { type: "string" },
                    order: { type: "number" }
                  }
                }
              }
            },
            required: ["title", "description", "category"]
          }
        },
        {
          name: "updateTutorial",
          description: "Atualiza um tutorial existente.",
          inputSchema: {
            type: "object",
            properties: {
              id: { type: "string" },
              updates: { type: "object" }
            },
            required: ["id", "updates"]
          }
        },
        {
          name: "deleteTutorial",
          description: "Remove um tutorial do sistema.",
          inputSchema: {
            type: "object",
            properties: {
              id: { type: "string" }
            },
            required: ["id"]
          }
        },
        {
          name: "getTutorials",
          description: "Lista todos os tutoriais disponíveis.",
          inputSchema: {
            type: "object",
            properties: {
              category: { type: "string" },
              limit: { type: "number" }
            }
          }
        },
        {
          name: "createFile",
          description: "Cria um novo arquivo no sistema.",
          inputSchema: {
            type: "object",
            properties: {
              path: { type: "string" },
              content: { type: "string" }
            },
            required: ["path", "content"]
          }
        },
        {
          name: "updateFile",
          description: "Atualiza um arquivo existente.",
          inputSchema: {
            type: "object",
            properties: {
              path: { type: "string" },
              content: { type: "string" }
            },
            required: ["path", "content"]
          }
        },
        {
          name: "deleteFile",
          description: "Remove um arquivo do sistema.",
          inputSchema: {
            type: "object",
            properties: {
              path: { type: "string" }
            },
            required: ["path"]
          }
        },
        {
          name: "listFiles",
          description: "Lista arquivos em um diretório.",
          inputSchema: {
            type: "object",
            properties: {
              directory: { type: "string" }
            }
          }
        }
      ]
    });
  }

  if (req.method === "callTool") {
    try {
      if (!req.params || !req.params.name) {
        throw new Error("Parâmetros inválidos: nome da ferramenta não especificado");
      }
      
      const { name, arguments: args = {} } = req.params;
      const validTools = [
        "generateComponent", "generateTutorialStep", "generateHook", "generateService", "generateContext",
        "createTutorial", "updateTutorial", "deleteTutorial", "getTutorials",
        "createFile", "updateFile", "deleteFile", "listFiles"
      ];
      
      if (!validTools.includes(name)) {
        throw new Error(`Ferramenta desconhecida: ${name}`);
      }

      if (name === "generateComponent") {
      if (!args.name) {
        throw new Error("O parâmetro 'name' é obrigatório para generateComponent");
      }
      const withStyleImport = args.withStyles ? "\nimport './styles.css';" : "";
      const code = `
import React from "react";
${withStyleImport}

export default function ${args.name}() {
  return (
    <div className="tutorial-component p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-blue-600">${args.name}</h2>
      <div className="mt-2">
        <p className="text-gray-700">Conteúdo do componente ${args.name}</p>
      </div>
    </div>
  );
}`;
      sendResponse(req.id, { output: code });
    }

      if (name === "generateTutorialStep") {
      if (!args.title || !args.description) {
        throw new Error("Os parâmetros 'title' e 'description' são obrigatórios para generateTutorialStep");
      }
      const stepOrder = args.order ? args.order : 1;
      const code = `
import React from "react";
import { useEditor } from "../hooks/useEditor";

export default function TutorialStep${stepOrder}() {
  const { nextStep, previousStep } = useEditor();

  return (
    <div className="tutorial-step p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-700">${args.title}</h2>
      <div className="mt-4 prose">
        <p>${args.description}</p>
      </div>
      <div className="mt-6 flex justify-between">
        <button 
          onClick={previousStep}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Anterior
        </button>
        <button 
          onClick={nextStep}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}`;
      sendResponse(req.id, { output: code });
    }

      if (name === "generateHook") {
      if (!args.name) {
        throw new Error("O parâmetro 'name' é obrigatório para generateHook");
      }
      const code = `
import { useState, useEffect } from "react";

export function use${args.name}() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    setLoading(true);
    setError(null);
    
    try {
      // Implementação da lógica do hook ${args.name}
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Ocorreu um erro');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData, setData };
}`;
      sendResponse(req.id, { output: code });
    }

      if (name === "generateService") {
      if (!args.name || !args.endpoint) {
        throw new Error("Os parâmetros 'name' e 'endpoint' são obrigatórios para generateService");
      }
      const methods = args.methods || ["get"];
      
      let methodsCode = '';
      
      if (methods.includes("get")) {
        methodsCode += `
  async function getAll() {
    try {
      const response = await axios.get("${args.endpoint}");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      throw error;
    }
  }

  async function getById(id) {
    try {
      const response = await axios.get(\`\${args.endpoint}/\${id}\`);
      return response.data;
    } catch (error) {
      console.error(\`Erro ao buscar item \${id}:\`, error);
      throw error;
    }
  }`;
      }
      
      if (methods.includes("post")) {
        methodsCode += `

  async function create(data) {
    try {
      const response = await axios.post("${args.endpoint}", data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar item:", error);
      throw error;
    }
  }`;
      }
      
      if (methods.includes("put")) {
        methodsCode += `

  async function update(id, data) {
    try {
      const response = await axios.put(\`\${args.endpoint}/\${id}\`, data);
      return response.data;
    } catch (error) {
      console.error(\`Erro ao atualizar item \${id}:\`, error);
      throw error;
    }
  }`;
      }
      
      if (methods.includes("delete")) {
        methodsCode += `

  async function remove(id) {
    try {
      const response = await axios.delete(\`\${args.endpoint}/\${id}\`);
      return response.data;
    } catch (error) {
      console.error(\`Erro ao remover item \${id}:\`, error);
      throw error;
    }
  }`;
      }
      
      const exportMethods = [];
      if (methods.includes("get")) exportMethods.push("getAll", "getById");
      if (methods.includes("post")) exportMethods.push("create");
      if (methods.includes("put")) exportMethods.push("update");
      if (methods.includes("delete")) exportMethods.push("remove");
      
      const code = `
import axios from "axios";

export const ${args.name}Service = (() => {${methodsCode}

  return { ${exportMethods.join(", ")} };
})();
`;
      sendResponse(req.id, { output: code });
    }

      if (name === "generateContext") {
      if (!args.name) {
        throw new Error("O parâmetro 'name' é obrigatório para generateContext");
      }
      const initialStateStr = args.initialState 
        ? JSON.stringify(args.initialState, null, 2).replace(/"([^"]+)":/g, '$1:') 
        : '{ loading: false, error: null, data: null }';
      
      const code = `
import React, { createContext, useContext, useReducer } from "react";

// Definindo o estado inicial
const initialState = ${initialStateStr};

// Criando o contexto
const ${args.name}Context = createContext();

// Definindo o reducer
function ${args.name.toLowerCase()}Reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

// Criando o provider
export function ${args.name}Provider({ children }) {
  const [state, dispatch] = useReducer(${args.name.toLowerCase()}Reducer, initialState);

  // Ações disponíveis no contexto
  const setLoading = (isLoading) => {
    dispatch({ type: "SET_LOADING", payload: isLoading });
  };

  const setError = (error) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const setData = (data) => {
    dispatch({ type: "SET_DATA", payload: data });
  };

  // Valor do contexto
  const value = {
    ...state,
    setLoading,
    setError,
    setData
  };

  return (
    <${args.name}Context.Provider value={value}>
      {children}
    </${args.name}Context.Provider>
  );
}

// Hook para usar o contexto
export function use${args.name}() {
  const context = useContext(${args.name}Context);
  if (!context) {
    throw new Error("use${args.name} deve ser usado dentro de um ${args.name}Provider");
  }
  return context;
}
`;
      sendResponse(req.id, { output: code });
    }

      // Novas ferramentas de gerenciamento de tutoriais
      if (name === "createTutorial") {
        if (!args.title || !args.description || !args.category) {
          throw new Error("Os parâmetros 'title', 'description' e 'category' são obrigatórios para createTutorial");
        }
        
        const tutorialId = Date.now().toString();
        const tutorialData = {
          id: tutorialId,
          title: args.title,
          description: args.description,
          category: args.category,
          difficulty: args.difficulty || "beginner",
          estimatedTime: args.estimatedTime || "30 min",
          steps: args.steps || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // Salvar dados do tutorial
        const tutorialsDir = path.join(__dirname, "src", "data", "tutorials");
        if (!fs.existsSync(tutorialsDir)) {
          fs.mkdirSync(tutorialsDir, { recursive: true });
        }
        
        const tutorialFile = path.join(tutorialsDir, `${tutorialId}.json`);
        fs.writeFileSync(tutorialFile, JSON.stringify(tutorialData, null, 2));
        
        // Atualizar lista de tutoriais
        const tutorialsListFile = path.join(__dirname, "src", "data", "tutorialData.js");
        updateTutorialsList(tutorialData, tutorialsListFile);
        
        sendResponse(req.id, { 
          success: true, 
          tutorialId: tutorialId,
          message: "Tutorial criado com sucesso"
        });
      }

      if (name === "updateTutorial") {
        if (!args.id || !args.updates) {
          throw new Error("Os parâmetros 'id' e 'updates' são obrigatórios para updateTutorial");
        }
        
        const tutorialFile = path.join(__dirname, "src", "data", "tutorials", `${args.id}.json`);
        
        if (!fs.existsSync(tutorialFile)) {
          throw new Error(`Tutorial com ID ${args.id} não encontrado`);
        }
        
        const tutorialData = JSON.parse(fs.readFileSync(tutorialFile, 'utf8'));
        const updatedTutorial = {
          ...tutorialData,
          ...args.updates,
          updatedAt: new Date().toISOString()
        };
        
        fs.writeFileSync(tutorialFile, JSON.stringify(updatedTutorial, null, 2));
        
        // Atualizar lista de tutoriais
        const tutorialsListFile = path.join(__dirname, "src", "data", "tutorialData.js");
        updateTutorialsList(updatedTutorial, tutorialsListFile, true);
        
        sendResponse(req.id, { 
          success: true, 
          message: "Tutorial atualizado com sucesso"
        });
      }

      if (name === "deleteTutorial") {
        if (!args.id) {
          throw new Error("O parâmetro 'id' é obrigatório para deleteTutorial");
        }
        
        const tutorialFile = path.join(__dirname, "src", "data", "tutorials", `${args.id}.json`);
        
        if (!fs.existsSync(tutorialFile)) {
          throw new Error(`Tutorial com ID ${args.id} não encontrado`);
        }
        
        fs.unlinkSync(tutorialFile);
        
        // Atualizar lista de tutoriais
        const tutorialsListFile = path.join(__dirname, "src", "data", "tutorialData.js");
        removeTutorialFromList(args.id, tutorialsListFile);
        
        sendResponse(req.id, { 
          success: true, 
          message: "Tutorial removido com sucesso"
        });
      }

      if (name === "getTutorials") {
        const tutorialsDir = path.join(__dirname, "src", "data", "tutorials");
        const tutorials = [];
        
        if (fs.existsSync(tutorialsDir)) {
          const files = fs.readdirSync(tutorialsDir);
          
          for (const file of files) {
            if (file.endsWith('.json')) {
              const tutorialData = JSON.parse(fs.readFileSync(path.join(tutorialsDir, file), 'utf8'));
              
              if (!args.category || tutorialData.category === args.category) {
                tutorials.push(tutorialData);
              }
            }
          }
        }
        
        // Ordenar por data de criação
        tutorials.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Aplicar limite se especificado
        const limitedTutorials = args.limit ? tutorials.slice(0, args.limit) : tutorials;
        
        sendResponse(req.id, { 
          tutorials: limitedTutorials,
          total: tutorials.length
        });
      }

      // Ferramentas de manipulação de arquivos
      if (name === "createFile") {
        if (!args.path || !args.content) {
          throw new Error("Os parâmetros 'path' e 'content' são obrigatórios para createFile");
        }
        
        const fullPath = path.join(__dirname, args.path);
        const dir = path.dirname(fullPath);
        
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(fullPath, args.content);
        
        sendResponse(req.id, { 
          success: true, 
          message: `Arquivo criado: ${args.path}`
        });
      }

      if (name === "updateFile") {
        if (!args.path || !args.content) {
          throw new Error("Os parâmetros 'path' e 'content' são obrigatórios para updateFile");
        }
        
        const fullPath = path.join(__dirname, args.path);
        
        if (!fs.existsSync(fullPath)) {
          throw new Error(`Arquivo não encontrado: ${args.path}`);
        }
        
        fs.writeFileSync(fullPath, args.content);
        
        sendResponse(req.id, { 
          success: true, 
          message: `Arquivo atualizado: ${args.path}`
        });
      }

      if (name === "deleteFile") {
        if (!args.path) {
          throw new Error("O parâmetro 'path' é obrigatório para deleteFile");
        }
        
        const fullPath = path.join(__dirname, args.path);
        
        if (!fs.existsSync(fullPath)) {
          throw new Error(`Arquivo não encontrado: ${args.path}`);
        }
        
        fs.unlinkSync(fullPath);
        
        sendResponse(req.id, { 
          success: true, 
          message: `Arquivo removido: ${args.path}`
        });
      }

      if (name === "listFiles") {
        const directory = args.directory || "src";
        const fullPath = path.join(__dirname, directory);
        
        if (!fs.existsSync(fullPath)) {
          throw new Error(`Diretório não encontrado: ${directory}`);
        }
        
        const files = [];
        const items = fs.readdirSync(fullPath, { withFileTypes: true });
        
        for (const item of items) {
          files.push({
            name: item.name,
            type: item.isDirectory() ? 'directory' : 'file',
            path: path.join(directory, item.name)
          });
        }
        
        sendResponse(req.id, { 
          files: files,
          directory: directory
        });
      }
    } catch (error) {
      console.error("Erro ao processar chamada de ferramenta:", error);
      sendResponse(req.id, { error: error.message || "Erro desconhecido" });
    }
  }
});

// Iniciar processamento de entrada
rl.on("line", (line) => {
  try {
    const req = JSON.parse(line);
    process.stdin.emit("data", Buffer.from(line));
  } catch (error) {
    console.error("Erro ao processar linha de entrada:", error);
  }
});

// Funções auxiliares
function updateTutorialsList(tutorialData, tutorialsListFile, isUpdate = false) {
  try {
    let tutorialsList = [];
    
    if (fs.existsSync(tutorialsListFile)) {
      const content = fs.readFileSync(tutorialsListFile, 'utf8');
      // Extrair array de tutoriais do arquivo JS
      const match = content.match(/export const tutorials = (\[[\s\S]*?\]);/);
      if (match) {
        tutorialsList = JSON.parse(match[1]);
      }
    }
    
    if (isUpdate) {
      // Atualizar tutorial existente
      const index = tutorialsList.findIndex(t => t.id === tutorialData.id);
      if (index !== -1) {
        tutorialsList[index] = tutorialData;
      } else {
        tutorialsList.push(tutorialData);
      }
    } else {
      // Adicionar novo tutorial
      tutorialsList.push(tutorialData);
    }
    
    // Gerar conteúdo do arquivo
    const fileContent = `// Dados dos tutoriais - Gerado automaticamente pelo MCP
export const tutorials = ${JSON.stringify(tutorialsList, null, 2)};

export const categories = [
  { id: "react", name: "React", color: "#61dafb" },
  { id: "javascript", name: "JavaScript", color: "#f7df1e" },
  { id: "nodejs", name: "Node.js", color: "#339933" },
  { id: "css", name: "CSS", color: "#1572b6" },
  { id: "html", name: "HTML", color: "#e34f26" },
  { id: "mongodb", name: "MongoDB", color: "#47a248" },
  { id: "express", name: "Express", color: "#000000" },
  { id: "vite", name: "Vite", color: "#646cff" }
];

export const getTutorialById = (id) => {
  return tutorials.find(tutorial => tutorial.id === id);
};

export const getTutorialsByCategory = (category) => {
  return tutorials.filter(tutorial => tutorial.category === category);
};

export const getTutorialsByDifficulty = (difficulty) => {
  return tutorials.filter(tutorial => tutorial.difficulty === difficulty);
};
`;
    
    fs.writeFileSync(tutorialsListFile, fileContent);
  } catch (error) {
    console.error("Erro ao atualizar lista de tutoriais:", error);
  }
}

function removeTutorialFromList(tutorialId, tutorialsListFile) {
  try {
    if (!fs.existsSync(tutorialsListFile)) {
      return;
    }
    
    const content = fs.readFileSync(tutorialsListFile, 'utf8');
    const match = content.match(/export const tutorials = (\[[\s\S]*?\]);/);
    
    if (match) {
      let tutorialsList = JSON.parse(match[1]);
      tutorialsList = tutorialsList.filter(t => t.id !== tutorialId);
      
      // Regenerar arquivo
      const fileContent = content.replace(
        /export const tutorials = \[[\s\S]*?\];/,
        `export const tutorials = ${JSON.stringify(tutorialsList, null, 2)};`
      );
      
      fs.writeFileSync(tutorialsListFile, fileContent);
    }
  } catch (error) {
    console.error("Erro ao remover tutorial da lista:", error);
  }
}

console.log("MCP Tutorial Tool iniciado. Aguardando comandos...");