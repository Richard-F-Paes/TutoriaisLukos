import React from 'react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';
import VideoShowcase from '../../components/videos/VideoShowcase/VideoShowcase';

const ERPPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Navbar handled by App.jsx */}
      <VideoShowcase />
    </div>
  );
};

export default ERPPage;

