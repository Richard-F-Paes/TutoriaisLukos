import React, { useState } from 'react';
import {Play, Pause, Volume2, Maximize, Clock, Eye, ThumbsUp, Share2, Download, Radio, Users, Bell, ExternalLink} from 'lucide-react';

const CustomSection = ({
    // Video principal
    video = {
        title: "Lukos ERP - Visão Geral Completa",
        description: "Conheça todas as funcionalidades do sistema em uma demonstração completa de 5 minutos",
        duration: "5:23",
        views: "12.5k",
        likes: "892",
        category: "Overview",
        thumbnail: "https://img.youtube.com/vi/sjWk3XpdH3s/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/sjWk3XpdH3s?si=Zv2L029tcGpfA30W",
        highlights: [
            "Interface moderna e intuitiva",
            "PDV integrado com bombas",
            "Relatórios em tempo real",
            "Gestão completa de estoque"
        ]
    },
    // Banner
    bannerTitle = "Live Lukos ERP - Demonstração do Sistema",
    bannerLogo = "/icons/logo.png",
    // Canal
    channelName = "Lukos Soluções em Tecnologia",
    channelHandle = "@lukos-solucoesemtecnologia8036",
    channelUrl = "https://www.youtube.com/@lukos-solucoesemtecnologia8036",
    channelLogo = "/icons/logo.png",
    // Status
    isLive = true,
    liveText = "Transmitindo agora",
    // Sidebar
    showSidebar = true
}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section id="videos" className="py-20 bg-white text-gray-900">
            {/* Banner Header - YouTube Style */}
            <div className="relative w-full mb-16 overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-blue-700 via-purple-600 via-blue-600 to-purple-700 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                        {/* Logo e Texto */}
                        <div className="flex items-center space-x-8 justify-center w-full">
                            <div className="flex items-start">
                               
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hidden">
                                    <svg 
                                        className="w-8 h-8 text-blue-600" 
                                        viewBox="0 0 24 24" 
                                        fill="currentColor"
                                    >
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                </div>
                            </div>
                            {/* Text */}
                            <div className="text-white ">
                                <h2 className="text-lg md:text-xl font-semibold flex items-center justify-center">
                                    {bannerTitle}
                                </h2>
                            </div>
                        </div>
                        {/* Right side - YouTube style element */}
                        <div className="hidden md:flex items-center space-x-2">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Main Video Player */}
                    <div className="lg:col-span-3">
                        {/* Video Title Above */}
                        <div className="mb-6 bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200">
                            {isLive && (
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md">
                                        <Radio className="w-3 h-3 animate-pulse" />
                                        <span>AO VIVO</span>
                                    </div>
                                    <span className="text-sm text-gray-500 font-medium">{liveText}</span>
                                </div>
                            )}
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{video.title}</h3>
                            <p className="text-gray-600 text-sm md:text-base">{video.description}</p>
                        </div>
                        
                        <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border-2 border-gray-200">
                            <div className="aspect-video relative">
                                {isPlaying ? (
                                    <iframe
                                        src={`${video.videoUrl}&autoplay=1`}
                                        title={video.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                ) : (
                                    <>
                                        <img 
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover absolute inset-0"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <button 
                                                onClick={() => setIsPlaying(true)}
                                                className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-sm rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group shadow-2xl"
                                            >
                                                <svg 
                                                    className="w-10 h-10 text-white" 
                                                    viewBox="0 0 24 24" 
                                                    fill="currentColor"
                                                >
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Live Info - YouTube Style */}
                        <div className="mt-4">
                            {/* Channel Info */}
                            <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-xl p-5 mb-6 border border-gray-200 shadow-sm">
                                <div className="flex  sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center space-x-4 flex-1">
                                        <a 
                                            href={channelUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-16 h-16 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-gray-200 flex items-center justify-center bg-white hover:scale-105"
                                        >
                                            <img 
                                                src={channelLogo} 
                                                alt={channelName} 
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.className = 'w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105';
                                                    e.target.parentElement.innerHTML = channelName.charAt(0).toUpperCase();
                                                }}
                                            />
                                        </a>
                                        <div className="flex-1 min-w-0">
                                            <a 
                                                href={channelUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="block group"
                                            >
                                                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-lg mb-1">{channelName}</h4>
                                            </a>
                                            <p className="text-sm text-gray-500 truncate">{channelHandle}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 flex-wrap sm:flex-nowrap">
                                        <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg hover:scale-105 whitespace-nowrap">
                                            <Bell className="w-4 h-4" />
                                            <span className="hidden sm:inline">Inscrever-se</span>
                                            <span className="sm:hidden">Inscrever</span>
                                        </button>
                                        <a 
                                            href={channelUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2 hover:scale-105 whitespace-nowrap"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span className="hidden sm:inline">Ver Canal</span>
                                            <span className="sm:hidden">Canal</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Live Stats */}
                       
                            {/* Video Highlights */}
                            
                        </div>
                    </div>

                    {/* Sidebar - Live Chat Style */}
                    {showSidebar && (
                    <div className="lg:col-span-1 ">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-5 sticky top-4">
                            <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200">
                                <h4 className="font-semibold text-gray-900 text-lg">Informações</h4>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            </div>
                            
                            <div className="space-y-5">
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 shadow-sm">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Radio className="w-4 h-4 text-blue-600 animate-pulse" />
                                        <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transmissão ao vivo</span>
                                    </div>
                                    <p className="text-xs text-gray-700">Assista em tempo real</p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-3 ">
                                    <p className="text-xs text-gray-500 mb-3 font-medium uppercase">Canal</p>
                                    <div className="flex items-center space-x-3">
                                        <img 
                                            src={channelLogo} 
                                            alt={channelName} 
                                            className="w-10 h-10 object-contain rounded-full border-2 border-gray-200"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                        <a 
                                            href={channelUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 text-sm text-gray-900 hover:text-blue-600 transition-colors font-semibold"
                                        >
                                            <span>{channelName}</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 mb-2">Estatísticas</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Visualizações</span>
                                            <span className="font-semibold">{video.views}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Likes</span>
                                            <span className="font-semibold">{video.likes}</span>
                                        </div>
                                    </div>
                                </div>

                                <a 
                                    href={channelUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm shadow-md hover:shadow-lg"
                                >
                                    Ver Canal no YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CustomSection;
