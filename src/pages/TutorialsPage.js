import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import './TutorialPages.css';

function TutorialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [tutorials, setTutorials] = useState([]);
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", name: "Todas as Categorias", icon: "" },
    { id: "pdv", name: "PDV CAIXA", icon: "" },
    { id: "retaguarda", name: "Retaguarda", icon: "" },
    { id: "faturamento", name: "Dashboard", icon: "" },
    { id: "relatorios", name: "Fatura Web", icon: "" },
    { id: "configuracoes", name: "Pré-Venda", icon: "" },
    { id: "integracao", name: "PDV-SMART POS", icon: "" },
  ];

  const difficulties = [
    { id: "all", name: "Todas as Dificuldades" },
    { id: "Iniciante", name: "Iniciante" },
    { id: "Intermediário", name: "Intermediário" },
    { id: "Avançado", name: "Avançado" },
  ];

  // Mock de dados (substitua pela sua API quando quiser)
  useEffect(() => {
    setTimeout(() => {
      const allTutorials = [
        { id: 1, title: "Medição De Tanque", description: "Aprenda a realizar sua primeira venda", duration: "5 min", difficulty: "Iniciante", category: "pdv", rating: 4.8, students: 1250 },
        { id: 2, title: "Aferição", description: "Como cadastrar e gerenciar clientes", duration: "8 min", difficulty: "Iniciante", category: "pdv", rating: 4.6, students: 980 },
        { id: 3, title: "Venda Comum", description: "Configurar e usar diferentes formas de pagamento", duration: "10 min", difficulty: "Intermediário", category: "pdv", rating: 4.7, students: 1100 },
        { id: 4, title: "Sangria", description: "", duration: "18 min", difficulty: "Intermediário", category: "pdv", rating: 4.7, students: 890 },
        { id: 5, title: "Recebimento", description: "", duration: "18 min", difficulty: "Intermediário", category: "pdv", rating: 4.7, students: 890 },
        { id: 6, title: "Cancelar Cupom", description: "", duration: "18 min", difficulty: "Intermediário", category: "pdv", rating: 4.7, students: 890 },
        { id: 7, title: "reimprimir Cupom", description: "", duration: "18 min", difficulty: "Intermediário", category: "pdv", rating: 4.7, students: 890 },
        { id: 8, title: "Desconto No Cupom", description: "", duration: "18 min", difficulty: "Intermediário", category: "pdv", rating: 4.7, students: 890 },
        { id: 9, title: "Relatório De Caixa", description: "", duration: "18 min", difficulty: "Intermediário", category: "pdv", rating: 4.7, students: 890 },
        { id: 10, title: "Serviços", description: "", duration: "18 min", difficulty: "Intermediário", category: "pdv", rating: 4.7, students: 890 },
        { id: 11, title: "Despesa Ou Pagamento", description: "", duration: "18 min", difficulty: "Intermediário", category: "pdv", rating: 4.7, students: 890 },
        { id: 12, title: "Cancelar Venda", description: "", duration: "18 min", difficulty: "Intermediário", category: "pdv", rating: 4.7, students: 890 },
        { id: 13, title: "Consulta De Venda", description: "", duration: "18 min", difficulty: "Intermediário", category: "pdv", rating: 4.7, students: 890 },

        { id: 4, title: "Cadastro de Produtos", description: "Como cadastrar produtos no sistema", duration: "15 min", difficulty: "Iniciante", category: "retaguarda", rating: 4.6, students: 1200 },
        { id: 5, title: "", description: "", duration: "18 min", difficulty: "Intermediário", category: "", rating: 4.7, students: 890 },
        { id: 6, title: "", description: "", duration: "18 min", difficulty: "Intermediário", category: "", rating: 4.7, students: 890 },
        { id: 7, title: "", description: "", duration: "18 min", difficulty: "Intermediário", category: "", rating: 4.7, students: 890 },

      
      ];

      setTutorials(allTutorials);
      setFilteredTutorials(allTutorials);
      setLoading(false);
    }, 800); // leve delay só para demonstrar o loading
  }, []);

  // Normaliza strings para classes (remove acentos/maiúsculas/ espaços)
  const slugify = (text) =>
    text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  // Conta tutoriais por categoria (usado na grid de categorias)
  const countByCategory = (catId) => {
    if (catId === "all") return tutorials.length;
    return tutorials.filter((t) => t.category === catId).length;
  };

  // Filtragem principal
  useEffect(() => {
    let filtered = tutorials.slice();

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          (t.title && t.title.toLowerCase().includes(q)) ||
          (t.description && t.description.toLowerCase().includes(q))
      );
    }

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    if (selectedDifficulty && selectedDifficulty !== "all") {
      filtered = filtered.filter((t) => slugify(t.difficulty) === slugify(selectedDifficulty));
    }

    setFilteredTutorials(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty, tutorials]);

  // seleciona/desseleciona categoria ao clicar na categoria-card
  const toggleCategory = (catId) => {
    setSelectedCategory((prev) => (prev === catId ? "all" : catId));
  };

  if (loading) {
    return (
      <div className="loading-container" role="status" aria-live="polite">
        <div className="loading-spinner" aria-hidden="true"></div>
        <p>Carregando tutoriais...</p>
      </div>
    );
  }

  return (
    <div className="tutorials-container">

      {/* --------------------------
          CATEGORIES GRID (topo)
         -------------------------- */}
      <section className="categories-section" aria-label="Categorias">
        <div className="section-header">
          <h2 className="section-title">Categorias</h2>
          <p className="section-description">Escolha uma categoria para filtrar os tutoriais rapidamente.</p>
        </div>

        <div className="categories-grid">
          {categories.map((c) => {
            const active = selectedCategory === c.id;
            // adiciona classe com id da categoria (útil para color-bar via CSS)
            const cardClass = `category-card ${slugify(c.id)} ${active ? "active" : ""}`;
            return (
              <button
                key={c.id}
                className={cardClass}
                onClick={() => toggleCategory(c.id)}
                aria-pressed={active}
                type="button"
              >
                <span className="category-icon" aria-hidden="true">{c.icon}</span>
                <div className="category-content">
                  <div className="category-title">{c.name}</div>
                  <div className="category-count">{countByCategory(c.id)} tutoriais</div>
                  <div className="category-description">Ver tutoriais da categoria {c.name}.</div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* --------------------------
          FILTROS
         -------------------------- */}
      <motion.div
        className="filters-box"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        aria-label="Filtros"
      >
        <div className="filters-grid">
          <div className="filter-item">
            <label className="filter-label" htmlFor="search">Buscar</label>
            <input
              id="search"
              className="filter-input"
              type="text"
              placeholder="Digite o nome do tutorial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar tutoriais"
            />
          </div>

          <div className="filter-item">
            <label className="filter-label" htmlFor="category-select">Categoria</label>
            <select
              id="category-select"
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label className="filter-label" htmlFor="difficulty-select">Dificuldade</label>
            <select
              id="difficulty-select"
              className="filter-select"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {difficulties.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="results-count" aria-live="polite">
          {filteredTutorials.length} {filteredTutorials.length === 1 ? "tutorial encontrado" : "tutoriais encontrados"}
        </div>
      </motion.div>

      {/* --------------------------
          TUTORIALS GRID
         -------------------------- */}
      <AnimatePresence mode="wait">
        <motion.div
          className="tutorials-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="list"
        >
          {filteredTutorials.map((tutorial, index) => {
            const diffClass = `difficulty difficulty-${slugify(tutorial.difficulty)}`;
            return (
              <motion.article
                key={tutorial.id}
                className="tutorial-card"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                role="listitem"
              >
                <Link to={`/tutorial/${tutorial.id}`} className="tutorial-link" aria-label={`Abrir tutorial ${tutorial.title}`}>
                  <div className="tutorial-header">
                    <div className="tutorial-icon" aria-hidden="true">
                      {categories.find(c => c.id === tutorial.category)?.icon ?? "📚"}
                    </div>
                    <div>
                      <h3 className="tutorial-card-title">{tutorial.title}</h3>
                      <p className="tutorial-card-description">{tutorial.description}</p>
                    </div>
                  </div>

                  <div className="tutorial">
                    <div className="tutorial-meta-left">
                      <span className="meta-duration">⏱ {tutorial.duration}</span>
                      <span className={diffClass}>{tutorial.difficulty}</span>
                    </div>

                  </div>

                  <div className="tutorial-footer">
        
                    <span className="tutorial-start">Iniciar →</span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* --------------------------
          NENHUM RESULTADO
         -------------------------- */}
      {filteredTutorials.length === 0 && (
        <motion.div
          className="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          role="status"
        >
          <div className="no-results-icon">🔍</div>
          <h3 className="no-results-title">Nenhum tutorial encontrado</h3>
          <p className="no-results-description">Tente ajustar os filtros ou selecionar outra categoria.</p>
          <button
            className="no-results-button"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedDifficulty("all");
            }}
          >
            Limpar Filtros
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default TutorialsPage;
