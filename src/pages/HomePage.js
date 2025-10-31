
import HeroTutorial from '../components/HeroTutorial/HeroTutorial';
import HeroSection from '../components/HeroSection/HeroSection';
import VideoTutorialsPage from './VideoTutorialsPage';
import VideoShowcase from '../components/VideoShowcase/VideoShowcase';
import FAQSection from '../components/FAQSection/FAQSection';
import MobileNav from '../components/MobileNav/MobileNav';
import Solutions from '../components/Solutions/Solutions';

function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroTutorial />
      <VideoShowcase />
      <FAQSection />
      <Solutions />
     
      <MobileNav />
    </>
  );
}

export default HomePage;
