import React from 'react';
import Hero from '../components/Hero/Hero';
import Categories from '../components/Categories/Categories';
import Tutorials from '../components/Tutorials/Tutorials';
import CTA from '../components/CTA/CTA';

function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Tutorials />
      <CTA />
    </>
  );
}

export default HomePage;
