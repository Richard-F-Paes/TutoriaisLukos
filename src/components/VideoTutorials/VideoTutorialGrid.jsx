import React from 'react';
import VideoTutorialCard from './VideoTutorialCard';
import { tutorials } from '../../data/videoTutorialsData';

const VideoTutorialGrid = ({ category, subcategory, subSubcategory }) => {
  const filteredTutorials = subSubcategory
    ? tutorials.filter(tutorial => 
        tutorial.category === category && 
        tutorial.subcategory === subcategory &&
        tutorial.subSubcategory === subSubcategory
      )
    : subcategory
    ? tutorials.filter(tutorial => tutorial.category === category && tutorial.subcategory === subcategory)
    : category 
    ? tutorials.filter(tutorial => tutorial.category === category)
    : tutorials;

  if (filteredTutorials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Nenhum tutorial encontrado
        </h3>
        <p className="text-gray-400 text-center">
          Não há tutoriais disponíveis para a categoria "{category}" no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {filteredTutorials.map((tutorial) => (
        <VideoTutorialCard key={tutorial.id} tutorial={tutorial} />
      ))}
    </div>
  );
};

export default VideoTutorialGrid;

