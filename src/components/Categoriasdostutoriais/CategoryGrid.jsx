import React, { useState } from "react";
import { Search, Filter, Package, Target, Menu, X, Home, Grid3x3, BookOpen, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryGrid = ({
  title = "Gerenciamento de Categorias",
  subtitle = "Organize e gerencie os itens do sistema",
  categories = [],
  data = [],
  highlight = null,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/conveniencia', icon: Grid3x3, label: 'Conveniência' },
    { path: '/retaguarda', icon: BookOpen, label: 'Retaguarda' },
    { path: '/gerador-senha', icon: Settings, label: 'Gerador de Senha' },
  ];

  const filteredData = data.filter((item) => {
    const matchesCategory =
      selectedCategory === "Todas" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Menu Lateral de Navegação */}
      {isNavMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 lg:bg-transparent" onClick={() => setIsNavMenuOpen(false)}></div>
          <div className="absolute left-0 top-0 h-full w-64 bg-white border-r border-gray-200 pt-[70px] z-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <img src="/logo.png" alt="" className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-semibold text-black">Lukos</span>
                </div>
                <button onClick={() => setIsNavMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="space-y-2">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsNavMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <IconComponent className="w-6 h-6" />
                      <span className="text-black">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-8xl mt-12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botão Menu */}
        <div className="mb-4">
          <button
            onClick={() => setIsNavMenuOpen(true)}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        {/* Header */}
        <div className="text-center mb-12 bg-gradient-to-r from-blue-600  via-blue-700 to-blue-800 h-60  ro flex items-center rounded-xl flex-col text-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Highlight Section */}
        {highlight && (
          <div
            className={`bg-gradient-to-r ${highlight.color} rounded-lg shadow-lg p-8 mb-8 text-white`}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-6 lg:mb-0">
                <h2 className="text-2xl font-bold mb-2">{highlight.title}</h2>
                <p className="text-lg opacity-90 mb-4">
                  {highlight.description}
                </p>
                <div className="flex items-center space-x-4 text-sm opacity-80">
                  {highlight.features.map((f, i) => (
                    <span key={i}>• {f}</span>
                  ))}
                </div>
              </div>
              <Link
                to={highlight.link}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
              >
                {highlight.icon && (
                  <highlight.icon className="h-5 w-5 mr-2" />
                )}
                {highlight.buttonLabel}
              </Link>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Todas">Todas</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-600 mb-6">
          Mostrando {filteredData.length} item
          {filteredData.length !== 1 && "s"}
          {selectedCategory !== "Todas" && ` na categoria "${selectedCategory}"`}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 xl:p-12   gap-6">
          {filteredData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className={`h-48 bg-gradient-to-br ${item.color} flex items-center justify-center`}
                >
                  <Icon className="h-20 w-20 text-white" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {item.description}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-1" /> {item.productCount}{" "}
                      itens
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" /> {item.category}
                    </div>
                  </div>
                  <Link
                    to={item.link || `/tutorial/${item.tutorialId}`}
                    className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Ver Tutorial
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* No results */}
        {filteredData.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Nenhum resultado encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryGrid;
