import React from 'react';
import InputSearch from '../components/InputSearch/InputSearch';
import HeroTutorial from '../components/HeroTutorial/HeroTutorial';
import VideoTutorialsPage from './VideoTutorialsPage';
import MobileNav from '../components/MobileNav/MobileNav';

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
