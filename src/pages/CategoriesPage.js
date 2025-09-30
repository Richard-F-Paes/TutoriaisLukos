import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Tutorials from '../components/Tutorials/Tutorials';
import BlogHeader from '../components/BlogHeader/BlogHeader';

function CategoriesPage() {
  return (
    <>
    <Tutorials />
      <BlogHeader />
      
    </>
  );
}
export default CategoriesPage;
