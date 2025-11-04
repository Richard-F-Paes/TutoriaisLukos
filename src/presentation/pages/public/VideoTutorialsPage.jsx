import React, { useState } from 'react';
import VideoTutorialHeader from '../../components/videos/VideoTutorials/VideoTutorialHeader';
import VideoTutorialSidebar from '../../components/videos/VideoTutorials/VideoTutorialSidebar';
import VideoTutorialGrid from '../../components/videos/VideoTutorials/VideoTutorialGrid';
import VideoTutorialCategories from '../../components/videos/VideoTutorials/VideoTutorialCategories';
import VideoTutorialSubcategories from '../../components/videos/VideoTutorials/VideoTutorialSubcategories';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '../../../contexts/ThemeContext';

const VideoTutorialsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState('');
  const [showCategorySubcats, setShowCategorySubcats] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
    // Para Retaguarda, mostrar subcategorias primeiro
    if (category === 'Retaguarda') {
      setShowCategorySubcats(true);
      setCurrentView('category-subcats');
    } else {
      setShowCategorySubcats(false);
      setCurrentView('category');
    }
  };

  const handleSubcategorySelect = (category, subcategory, subSubcategory = null) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setSelectedSubSubcategory(subSubcategory || '');
    
    // Se for Cadastros ou Produtos, mostrar sub-subcategorias primeiro
    if ((subcategory === 'Cadastros' || subcategory === 'Produtos') && !subSubcategory) {
      setCurrentView('subcategory-subcats');
    } else if (subSubcategory) {
      setCurrentView('subsubcategory');
    } else {
      setCurrentView('subcategory');
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    setSelectedCategory('');
    setSelectedSubcategory('');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#0f0f0f] transition-colors">
        <VideoTutorialHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex pt-16">
          <VideoTutorialSidebar 
            isOpen={sidebarOpen} 
            onViewChange={handleViewChange}
            currentView={currentView}
            onSubcategorySelect={handleSubcategorySelect}
            onCategorySelect={handleCategorySelect}
          />
          
          <main className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-16'
          } p-6`}>
            <div className="max-w-7xl mx-auto">
              {currentView === 'home' && (
                <>
                  <h1 className="text-2xl font-bold text-white mb-6">
                    Tutoriais Recomendados
                  </h1>
                  <VideoTutorialGrid />
                </>
              )}
              
              {currentView === 'categories' && (
                <>
                  <h1 className="text-2xl font-bold text-white mb-6">
                    Categorias
                  </h1>
                  <VideoTutorialCategories onCategorySelect={handleCategorySelect} />
                </>
              )}
              
              {currentView === 'category-subcats' && (
                <>
                  <h1 className="text-2xl font-bold text-white mb-6">
                    Subcategorias de {selectedCategory}
                  </h1>
                  <VideoTutorialSubcategories 
                    category={selectedCategory}
                    onSubcategorySelect={handleSubcategorySelect}
                  />
                </>
              )}
              
              {currentView === 'category' && (
                <>
                  <h1 className="text-2xl font-bold text-white mb-6">
                    Tutoriais de {selectedCategory}
                  </h1>
                  <VideoTutorialGrid category={selectedCategory} />
                </>
              )}
              
              {currentView === 'subcategory-subcats' && (
                <>
                  <h1 className="text-2xl font-bold text-white mb-6">
                    {selectedCategory} - {selectedSubcategory}
                  </h1>
                  <VideoTutorialSubcategories 
                    category={selectedCategory}
                    parentSubcategory={selectedSubcategory}
                    onSubcategorySelect={handleSubcategorySelect}
                  />
                </>
              )}
              
              {currentView === 'subcategory' && (
                <>
                  <h1 className="text-2xl font-bold text-white mb-6">
                    {selectedCategory} - {selectedSubcategory}
                  </h1>
                  <VideoTutorialGrid category={selectedCategory} subcategory={selectedSubcategory} />
                </>
              )}
              
              {currentView === 'subsubcategory' && (
                <>
                  <h1 className="text-2xl font-bold text-white mb-6">
                    {selectedCategory} - {selectedSubcategory} - {selectedSubSubcategory}
                  </h1>
                  <VideoTutorialGrid 
                    category={selectedCategory} 
                    subcategory={selectedSubcategory}
                    subSubcategory={selectedSubSubcategory}
                  />
                </>
              )}
            </div>
          </main>
        </div>
        
        <Toaster position="bottom-right" />
      </div>
    </ThemeProvider>
  );
};

export default VideoTutorialsPage;

