// components/ExampleCarouselImage.js
import React from 'react';

const ExampleCarouselImage = ({ src, alt, ...props }) => {
  return <img className="d-block w-100" src={src} alt={alt} {...props} />;
};

export default ExampleCarouselImage;
