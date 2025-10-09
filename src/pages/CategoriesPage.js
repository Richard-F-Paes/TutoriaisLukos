import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Tutorials from '../components/tutorial/Tutorials/Tutorials';
import BlogHeader from '../components/BlogHeader/BlogHeader';
import HighlightsSection from '../components/HighlightsSection/HighlightsSection';

function CategoriesPage() {
  return (
    <>
    
      <BlogHeader />
      <HighlightsSection />
      
    </>
  );
}
export default CategoriesPage;
