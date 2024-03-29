import React from "react";
import Slider1 from '../images/Slider1.avif'
import Slider2 from '../images/Slider2.jpeg'
import Slider3 from '../images/Slider3.jpg'

function Slider() {
  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={Slider1} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={Slider2} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={Slider3} className="d-block w-100" alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Slider;
