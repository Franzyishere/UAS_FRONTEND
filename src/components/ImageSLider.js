import React, { useState, useEffect } from 'react';
import './ImageSlider.css'; // Import CSS untuk styling (buat file ImageSlider.css terlebih dahulu)

const ImageSlider = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000); // Ganti 5000 dengan interval waktu yang diinginkan
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-slider">
      <img src={images[currentImage]} alt={`Slide ${currentImage + 1}`} />
    </div>
  );
};

export default ImageSlider;
