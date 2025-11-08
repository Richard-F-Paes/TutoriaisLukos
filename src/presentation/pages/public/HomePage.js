import React from 'react';
import InputSearch from '../../components/search/InputSearch/InputSearch';
import HeroTutorial from '../../components/features/HeroTutorial/HeroTutorial';
import VideoTutorialsPage from './VideoTutorialsPage';
import MobileNav from '../../components/layout/MobileNav/MobileNav/MobileNav';
import VideoShowcase from '../../components/videos/VideoShowcase/VideoShowcase';
import { CourseDetail } from '../../components/content/Courses/CousesDetail';


function HomePage() {
  return (
    <>
      <HeroTutorial />
      <MobileNav />
      <VideoShowcase />
      <CourseDetail />
    
    </>
  );
}

export default HomePage;
