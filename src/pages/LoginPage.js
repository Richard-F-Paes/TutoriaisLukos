import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import Categories from '../components/Categories/Categories';
import Loginjsx from '../components/Loginjsx/Login'
import Sidebarmenu from '../components/Sidebarmenu/Sidebarmenu';
import HeroSection from '../components/Categories/HeroSection/HeroSection';













function LoginPage() {
  return (
    <>
        
        <Sidebarmenu />
        <Loginjsx />


     
        
      
       
      
    </>
  );
}
export default LoginPage;