// TutorialMedia - Player de vídeo e galeria de imagens
import React from 'react';
import ReactPlayer from 'react-player';
import './TutorialMedia.css';

const TutorialMedia = ({ tutorial }) => {
  if (!tutorial.VideoUrl && !tutorial.ThumbnailUrl) {
    return null;
  }

  return (
    <div className="tutorial-media">
      {tutorial.VideoUrl && (
        <div className="tutorial-video">
          <ReactPlayer
            url={tutorial.VideoUrl}
            controls
            width="100%"
            height="auto"
            className="tutorial-video-player"
          />
        </div>
      )}
      
      {tutorial.ThumbnailUrl && !tutorial.VideoUrl && (
        <div className="tutorial-thumbnail">
          <img 
            src={tutorial.ThumbnailUrl} 
            alt={tutorial.Title}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default TutorialMedia;
