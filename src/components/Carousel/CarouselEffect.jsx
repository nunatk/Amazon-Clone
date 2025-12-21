import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CarouselEffect.css";
import { Carousel } from "react-responsive-carousel";
import { img } from "../img/data";

function CarouselEffect() {
  return (
    <div className="carousel-container">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {img.map((imageItemLink, index) => (
          <img src={imageItemLink} key={index} alt="" />
        ))}
      </Carousel>

      {/* fade overlay */}
      <div className="carousel-bottom-fade"></div>
    </div>
  );
}

export default CarouselEffect;
