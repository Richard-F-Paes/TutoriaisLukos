import React from 'react';
import PageNavbar from '../../components/layout/PageNavbar/PageNavbar';
import VideoShowcase from '../../components/videos/VideoShowcase/VideoShowcase';

const ERPPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageNavbar />
      <VideoShowcase />
    </div>
  );
};

export default ERPPage;

