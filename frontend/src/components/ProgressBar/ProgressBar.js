import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress = 0 }) => {
  return (
    <div className="progress-bar">
      <div 
        className="progress-fill" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
