import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, className = '', fallbackSrc = '/fallback.jpg' }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
      }}
      loading="lazy"
    />
  );
};

export default ImageWithFallback;


