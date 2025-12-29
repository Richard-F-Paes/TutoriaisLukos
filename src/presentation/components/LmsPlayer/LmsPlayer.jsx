import React, { useState, useEffect } from 'react';
import {
    Play,
    Check,
    Share2,
    MoreVertical,
    X,
    ChevronLeft,
    Star,
    Trophy,
    Layout,
    MessageSquare,
    FileText,
    Search,
    CheckCircle,
    PlayCircle,
    ChevronRight
} from 'lucide-react';
import './LmsPlayer.css';

const LmsPlayer = ({
    courseTitle = "Tutoriais Lukos - Guia de Sistemas",
    sections = [],
    onLessonSelect = () => { },
    initialLessonId = null
}) => {
    const [activeTab, setActiveTab] = useState('visao-geral');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);

    // Mock data if sections are empty
    const displaySections = sections.length > 0 ? sections : [
        {
            id: 1,
            title: "Módulo 1: Introdução",
            lessons: [
                { id: 415, title: "415. Tutorial: Visão Geral do Sistema", duration: "7m", type: "video" },
                { id: 416, title: "416. Guia: Primeiro Login e Acesso", duration: "1m", type: "text" },
                { id: 417, title: "417. Tutorial: Configurações Iniciais", duration: "4m", type: "video" },
                { id: 418, title: "418. Tutorial: Gestão de Usuários", duration: "5m", type: "video" },
                { id: 419, title: "419. Tutorial: Relatórios Básicos", duration: "5m", type: "video" },
                { id: 420, title: "420. Tutorial: Suporte e Ajuda", duration: "4m", type: "video" },
                { id: 421, title: "421. Tutorial Avançado: Customização", duration: "25m", type: "video" },
            ]
        }
    ];

    useEffect(() => {
        if (!currentLesson && displaySections.length > 0) {
            setCurrentLesson(displaySections[0].lessons[0]);
        }
    }, [displaySections, currentLesson]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const toggleLessonCompletion = (id, e) => {
        e.stopPropagation();
        setCompletedLessons(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleLessonClick = (lesson) => {
        setCurrentLesson(lesson);
        onLessonSelect(lesson);
    };

    const allLessons = displaySections.flatMap(s => s.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);

    const goToNextLesson = (e) => {
        e?.stopPropagation();
        if (currentIndex < allLessons.length - 1) {
            handleLessonClick(allLessons[currentIndex + 1]);
        }
    };

    const goToPrevLesson = (e) => {
        e?.stopPropagation();
        if (currentIndex > 0) {
            handleLessonClick(allLessons[currentIndex - 1]);
        }
    };

    const tabs = [
        { id: 'visao-geral', label: 'Visão geral', icon: Search },
        { id: 'perguntas', label: 'Perguntas e respostas', icon: MessageSquare },
        { id: 'observacoes', label: 'Observações', icon: FileText },
        { id: 'anuncios', label: 'Anúncios', icon: Trophy },
        { id: 'avaliacoes', label: 'Avaliações', icon: Star },
        { id: 'ferramentas', label: 'Ferramentas de aprendizado', icon: Layout },
    ];

    return (
        <div className="lms-container">
            {/* Header */}
            <header className="lms-header">
                <div className="lms-header-left">
                    <img src="/logo.png" alt="Lukos" className="lms-logo" />
                    <div className="lms-divider"></div>
                    <h1 className="lms-course-title">{courseTitle}</h1>
                </div>

                <div className="lms-header-right">
                    <div className="lms-header-action">
                        <Star className="w-4 h-4" />
                        <span>Deixe uma classificação</span>
                    </div>
                    <div className="lms-header-action">
                        <Trophy className="w-4 h-4" />
                        <span>Seu progresso</span>
                        <ChevronLeft className="w-4 h-4 rotate-270" />
                    </div>
                    <button className="lms-btn-share">
                        <span>Compartilhar</span>
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button className="lms-btn-options">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Main Layout */}
            <div className="lms-main-layout">
                {/* Content Area */}
                <main className="lms-content-area">
                    <div className="lms-video-container">
                        {currentLesson?.type === 'video' ? (
                            <div className="w-full h-full bg-black flex items-center justify-center relative group">
                                <PlayCircle className="w-20 h-20 text-white opacity-50 group-hover:scale-110 transition-transform cursor-pointer" />

                                {/* Navigation Arrows */}
                                <button
                                    onClick={goToPrevLesson}
                                    disabled={currentIndex === 0}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 disabled:hidden"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

                                <button
                                    onClick={goToNextLesson}
                                    disabled={currentIndex === allLessons.length - 1}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 disabled:hidden"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>

                                {/* Real video player would go here */}
                                <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 p-2 rounded text-sm text-gray-300 pointer-events-none">
                                    Player de Vídeo: {currentLesson.title}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full bg-gray-900 flex items-center justify-center relative group">
                                <FileText className="w-20 h-20 text-blue-400" />
                                <span className="ml-4 text-xl">Conteúdo em Texto: {currentLesson?.title}</span>

                                {/* Navigation Arrows for Text content too */}
                                <button
                                    onClick={goToPrevLesson}
                                    disabled={currentIndex === 0}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 disabled:hidden"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

                                <button
                                    onClick={goToNextLesson}
                                    disabled={currentIndex === allLessons.length - 1}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 disabled:hidden"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="lms-tabs-container">
                        <nav className="lms-tabs-header">
                            {tabs.map(tab => (
                                <div
                                    key={tab.id}
                                    className={`lms-tab ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </div>
                            ))}
                        </nav>

                        <div className="lms-tab-content">
                            {activeTab === 'visao-geral' && (
                                <div className="animate-in fade-in duration-500">
                                    <h2 className="lms-tab-title">Guia de Aprendizado: Domine as ferramentas Lukos</h2>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        Neste tutorial, você aprenderá passo a passo como utilizar as funcionalidades mais poderosas do nosso sistema para otimizar o seu fluxo de trabalho.
                                    </p>
                                    <p className="text-gray-300">
                                        Focaremos na praticidade e eficiência, garantindo que você tenha o melhor aproveitamento técnico.
                                    </p>
                                </div>
                            )}
                            {activeTab !== 'visao-geral' && (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                    <Layout className="w-12 h-12 mb-4 opacity-20" />
                                    <p>Conteúdo de {tabs.find(t => t.id === activeTab)?.label} em breve.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Sidebar */}
                <aside className={`lms-sidebar ${!isSidebarOpen ? 'closed' : ''}`}>
                    <div className="lms-sidebar-header">
                        <span className="lms-sidebar-title">Conteúdo do tutorial</span>
                        <div className="flex items-center gap-4">
                            <div className="text-[#a485f9] font-bold flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                                <Star className="w-4 h-4 fill-[#a485f9]" />
                                <span>AI Assistant</span>
                            </div>
                            <X className="lms-sidebar-close w-5 h-5 hover:text-red-500 transition-colors" onClick={toggleSidebar} />
                        </div>
                    </div>

                    <div className="lms-sidebar-content">
                        {displaySections.map(section => (
                            <div key={section.id}>
                                {section.lessons.map(lesson => (
                                    <div
                                        key={lesson.id}
                                        className={`lms-section-item ${currentLesson?.id === lesson.id ? 'active' : ''}`}
                                        onClick={() => handleLessonClick(lesson)}
                                    >
                                        <div
                                            className={`lms-checkbox ${completedLessons.includes(lesson.id) ? 'checked' : ''}`}
                                            onClick={(e) => toggleLessonCompletion(lesson.id, e)}
                                        >
                                            {completedLessons.includes(lesson.id) && <Check className="w-3 h-3" />}
                                        </div>
                                        <div className="lms-item-info">
                                            <div className="lms-item-title">{lesson.title}</div>
                                            <div className="lms-item-meta">
                                                {lesson.type === 'video' ? <PlayCircle className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                                                <span>{lesson.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </aside>

                {!isSidebarOpen && (
                    <button
                        className="fixed right-0 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-l-md shadow-lg z-50 hover:bg-gray-100"
                        onClick={toggleSidebar}
                    >
                        <ChevronLeft className="w-5 h-5 rotate-180" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default LmsPlayer;
