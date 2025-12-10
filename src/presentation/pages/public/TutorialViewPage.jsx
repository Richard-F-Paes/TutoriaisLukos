// TutorialViewPage - Página de visualização de tutorial
import React from 'react';
import { useParams } from 'react-router-dom';
import TutorialViewer from '../../components/TutorialViewer/TutorialViewer.jsx';

const TutorialViewPage = () => {
  const { slug } = useParams();

  return <TutorialViewer slug={slug} />;
};

export default TutorialViewPage;
