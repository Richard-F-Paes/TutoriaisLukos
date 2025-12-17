import React from 'react';
import InputSearch from '../../components/search/InputSearch/InputSearch';
import HeroTutorial from '../../components/features/HeroTutorial/HeroTutorial';
import BentoGrid from '../../components/custom/BentoGrid/BentoGrid';
import VideoTutorialsPage from './VideoTutorialsPage';
import VideoShowcase from '../../components/videos/VideoShowcase/VideoShowcase';
import { CourseDetail } from '../../components/content/Courses/CousesDetail';

import CustomSection from '../../components/custom/CustomSection/CustomSection';
import FeaturesSection from '../../components/custom/FeaturesSection/FeaturesSection';
import LandingHero from '../../components/custom/LandingHero/LandingHero';
import TeamSection from '../../components/custom/TeamSection/TeamSection';
import TrainingScheduler from '../../components/custom/TrainingScheduler/TrainingScheduler';
import ServicesSection from '../../components/custom/ServicesSection/ServicesSection';
import TrainingSection from '../../components/custom/TrainingSection/TrainingSection';
import { Chatbot } from '../../components/custom/Chatbot/Chatbot';


function HomePage() {
  return (
    <>
      <LandingHero />
      <HeroTutorial />
      <BentoGrid />
      <TrainingSection />
      <VideoShowcase />
      <ServicesSection />
      <TeamSection />
      <TrainingScheduler />
      <CustomSection />
      <Chatbot />







    </>
  );
}

export default HomePage;
