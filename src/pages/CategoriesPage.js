import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Tutorials from '../components/tutorial/Tutorials/Tutorials';
import BlogHeader from '../components/BlogHeader/BlogHeader';
import HighlightsSection from '../components/HighlightsSection/HighlightsSection';
import Page from '../components/Page/Page';

function CategoriesPage() {
  return (
    <>
    
      <Page />
      <HighlightsSection />
      
    </>
  );
}
export default CategoriesPage;
