import React, { useState } from 'react';
import {
    Search,
    MessageSquare,
    FileText,
    Trophy,
    Star,
    Layout,
    Share2,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    PlayCircle,
    CheckCircle2,
    Clock,
    X,
    Menu
} from 'lucide-react';
import './LmsPlayer.css';

const LmsPlayer = ({
    courseTitle = "Formação Lukos Professional",
    sections = []
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('visao-geral');
    const [currentLesson, setCurrentLesson] = useState(sections[0]?.lessons[0]);
    const [expandedSections, setExpandedSections] = useState([sections[0]?.id]);
    const [completedLessons, setCompletedLessons] = useState([]);

    const toggleSection = (sectionId) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const handleLessonClick = (lesson) => {
        setCurrentLesson(lesson);
        // On mobile, automatically close sidebar when a lesson is selected
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    const toggleLessonComplete = (e, lessonId) => {
        e.stopPropagation();
        setCompletedLessons(prev =>
            prev.includes(lessonId)
                ? prev.filter(id => id !== lessonId)
                : [...prev, lessonId]
        );
    };

    // Use default sections if none provided for better preview
    const defaultSections = [
        {
            id: 1,
            title: "Introdução ao TutoriaisLukos",
            lessons: [
                { id: 1, title: "1. Bem-vindo à plataforma", duration: "2m", type: "video" },
                { id: 2, title: "2. Como navegar nos tutoriais", duration: "5m", type: "video" },
                { id: 3, title: "3. Configurando seu ambiente", duration: "10m", type: "video" }
            ]
        }
    ];

    const displaySections = sections.length > 0 ? sections : defaultSections;

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
                    <div className="lms-video-container-outer">
                        <div className="lms-video-container">
                            {currentLesson?.type === 'video' ? (
                                <div className="w-full h-full bg-black flex items-center justify-center relative group">
                                    {currentLesson.videoUrl ? (
                                        currentLesson.videoUrl.includes('youtube.com/embed') || currentLesson.videoUrl.includes('player.vimeo.com') ? (
                                            <iframe
                                                src={currentLesson.videoUrl}
                                                className="w-full h-full border-0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={currentLesson.title}
                                            ></iframe>
                                        ) : (
                                            <video
                                                src={currentLesson.videoUrl}
                                                controls
                                                className="w-full h-full"
                                                controlsList="nodownload"
                                            ></video>
                                        )
                                    ) : (
                                        <>
                                            <PlayCircle className="w-20 h-20 text-white opacity-50 group-hover:scale-110 transition-transform cursor-pointer" />
                                            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 p-2 rounded text-sm text-gray-300 pointer-events-none">
                                                Player de Vídeo: {currentLesson.title}
                                            </div>
                                        </>
                                    )}

                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={goToPrevLesson}
                                        disabled={currentIndex === 0}
                                        className="lms-nav-arrow left"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>

                                    <button
                                        onClick={goToNextLesson}
                                        disabled={currentIndex === allLessons.length - 1}
                                        className="lms-nav-arrow right"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full h-full bg-gray-900 flex items-center justify-center relative group p-8 text-center">
                                    <div className="flex flex-col items-center">
                                        <FileText className="w-20 h-20 text-blue-400 mb-4" />
                                        <span className="text-xl font-semibold">{currentLesson?.title}</span>
                                        <p className="text-gray-400 mt-2 max-w-md">Este é um conteúdo em formato de texto. Veja as observações abaixo para mais detalhes.</p>
                                    </div>

                                    {/* Navigation Arrows for Text content too */}
                                    <button
                                        onClick={goToPrevLesson}
                                        disabled={currentIndex === 0}
                                        className="lms-nav-arrow left"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>

                                    <button
                                        onClick={goToNextLesson}
                                        disabled={currentIndex === allLessons.length - 1}
                                        className="lms-nav-arrow right"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lms-tabs-container">
                        <div className="lms-tabs-header">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        className={`lms-tab ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="lms-tab-content">
                            <h2 className="lms-tab-title">
                                {tabs.find(t => t.id === activeTab)?.label}
                            </h2>
                            <p className="text-gray-600">
                                Conteúdo em desenvolvimento para: {currentLesson?.title}
                            </p>
                        </div>
                    </div>
                </main>

                {/* Sidebar */}
                <aside className={`lms-sidebar ${sidebarOpen ? '' : 'closed'}`}>
                    <div className="lms-sidebar-header">
                        <span className="lms-sidebar-title">Conteúdo do curso</span>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="lms-sidebar-content">
                        {displaySections.map((section) => (
                            <div key={section.id} className="lms-section">
                                <button
                                    className="lms-section-header"
                                    onClick={() => toggleSection(section.id)}
                                >
                                    <span className="lms-section-title">{section.title}</span>
                                    <ChevronLeft className={`w-4 h-4 transition-transform ${expandedSections.includes(section.id) ? 'rotate-270' : 'rotate-90'}`} />
                                </button>

                                {expandedSections.includes(section.id) && (
                                    <div className="lms-section-lessons">
                                        {section.lessons.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                className={`lms-section-item ${currentLesson?.id === lesson.id ? 'active' : ''}`}
                                                onClick={() => handleLessonClick(lesson)}
                                            >
                                                <div
                                                    className={`lms-checkbox ${completedLessons.includes(lesson.id) ? 'checked' : ''}`}
                                                    onClick={(e) => toggleLessonComplete(e, lesson.id)}
                                                >
                                                    {completedLessons.includes(lesson.id) && <CheckCircle2 className="w-4 h-4" />}
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
                                )}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Mobile Toggle Sidebar */}
                {!sidebarOpen && (
                    <button
                        className="fixed right-4 bottom-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg lg:hidden z-100"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default LmsPlayer;
