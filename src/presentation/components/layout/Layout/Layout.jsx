import React from 'react';

const Layout = ({ 
  children, 
  className = '',
  container = true,
  maxWidth = 'max-w-7xl',
  background = 'bg-gray-50',
  backgroundImage = null,
  imagePosition = 'cover'
}) => {
  const backgroundStyle = backgroundImage 
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: imagePosition,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  return (
    <div 
      className={`min-h-screen ${!backgroundImage ? background : ''} ${className}`}
      style={backgroundStyle}
    >
      {container ? (
        <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${maxWidth}`}>
          {children}
        </div>
      ) : (
        <div className="w-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default Layout;

