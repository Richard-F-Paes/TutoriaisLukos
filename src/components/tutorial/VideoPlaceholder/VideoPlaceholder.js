import React, { useState } from 'react';
import { useTutorial } from '../../../contexts/TutorialContext';
import './VideoPlaceholder.css';

const VideoPlaceholder = ({ title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { setPlaying } = useTutorial();

  const handlePlay = () => {
    setIsPlaying(true);
    setPlaying(true);
    
    // Simula duração do vídeo
    setTimeout(() => {
      setIsPlaying(false);
      setPlaying(false);
    }, 5000);
  };

  return (
    <div className="video-container">
      <div 
        className={`video-placeholder ${isPlaying ? 'playing' : ''}`}
        onClick={handlePlay}
      >
        <i className={`fas ${isPlaying ? 'fa-pause-circle' : 'fa-play-circle'}`}></i>
        <p>{isPlaying ? 'Reproduzindo vídeo...' : title}</p>
      </div>
    </div>
  );
};

export default VideoPlaceholder;
