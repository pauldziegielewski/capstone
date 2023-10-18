import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Define the ImageCarousel component
const ImageCarousel = ({ images }) => {
  return (
    <Carousel>
      {images.map((image, index) => (
        <div key={index} className="carousel-image">
          <img src={image} alt={`Image ${index}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel; // Export the component as default
