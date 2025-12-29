// TrainingMedia - Player de vídeo para treinamentos
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { appConfig } from '../../../infrastructure/config/app.config.js';
import './TrainingMedia.css';

const TrainingMedia = ({ training }) => {
  // Normalizar campos
  const videos = training.videos || training.Videos || [];
  const thumbnailUrl = training.thumbnailUrl || training.ThumbnailUrl;
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Construir URL completa do vídeo
  const getVideoUrl = (video) => {
    const filePath = video.filePath || video.FilePath;
    if (!filePath) return null;
    
    // Se já for uma URL completa, retornar como está
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    
    // Construir URL completa usando a base da API
    const baseUrl = appConfig.apiUrl;
    // Remover barra inicial do filePath se houver
    const cleanPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
    return `${baseUrl}${cleanPath}`;
  };

  const currentVideo = videos.length > 0 ? videos[currentVideoIndex] : null;
  const currentVideoUrl = currentVideo ? getVideoUrl(currentVideo) : null;

  if (!currentVideoUrl && !thumbnailUrl) {
    return null;
  }

  return (
    <div className="training-media">
      {currentVideoUrl && (
        <div className="training-video">
          <ReactPlayer
            url={currentVideoUrl}
            controls
            width="100%"
            height="auto"
            className="training-video-player"
          />
        </div>
      )}
      
      {thumbnailUrl && !currentVideoUrl && (
        <div className="training-thumbnail">
          <img 
            src={thumbnailUrl} 
            alt={training.title || training.Title}
            loading="lazy"
          />
        </div>
      )}

      {/* Lista de vídeos se houver mais de um */}
      {videos.length > 1 && (
        <div className="training-videos-list">
          <h3 className="training-videos-list-title">Vídeos do Treinamento</h3>
          <div className="training-videos-grid">
            {videos.map((video, index) => {
              const videoUrl = getVideoUrl(video);
              const videoTitle = video.originalName || video.OriginalName || `Vídeo ${index + 1}`;
              const isActive = index === currentVideoIndex;
              
              return (
                <button
                  key={video.id || video.Id || index}
                  className={`training-video-item ${isActive ? 'active' : ''}`}
                  onClick={() => setCurrentVideoIndex(index)}
                >
                  <div className="training-video-item-thumbnail">
                    {videoUrl ? (
                      <ReactPlayer
                        url={videoUrl}
                        width="100%"
                        height="100%"
                        light={true}
                        playing={false}
                      />
                    ) : (
                      <div className="training-video-item-placeholder">
                        <span>Vídeo {index + 1}</span>
                      </div>
                    )}
                  </div>
                  <div className="training-video-item-info">
                    <span className="training-video-item-title">{videoTitle}</span>
                    {video.duration && (
                      <span className="training-video-item-duration">
                        {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingMedia;



