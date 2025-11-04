import React from 'react';
import InputSearch from '../../components/search/InputSearch/InputSearch';
import HeroTutorial from '../../components/features/HeroTutorial/HeroTutorial';
import VideoTutorialsPage from './VideoTutorialsPage';
import MobileNav from '../../components/layout/MobileNav/MobileNav/MobileNav';

function HomePage() {
  return (
    <>
      <InputSearch />
      <HeroTutorial />
      <VideoTutorialsPage />
      <MobileNav />
    </>
  );
}

export default HomePage;
