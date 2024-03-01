// CommunityImage.js
import React, { useEffect, useRef } from 'react';

// eslint-disable-next-line react/prop-types
const CommunityImage = ({ imageUrl, maxWidth, alt, keyProp, className }) => {
  //Utilizo Canvas para establecer una resolución de la imagen ya que si es muy grande no se renderiza bien
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();

    // image.crossOrigin = 'anonymous';
    image.onload = () => {
      const newHeight = (maxWidth * image.height) / image.width;

      canvas.width = maxWidth;
      canvas.height = newHeight;

      ctx.drawImage(image, 0, 0, maxWidth, newHeight);
    };

    image.src = imageUrl;
  }, [imageUrl, maxWidth]);

  return <canvas ref={canvasRef} alt={alt} key={keyProp} className={className} />;
};

export default CommunityImage;
