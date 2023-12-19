import React from "react";
import { Bootstrap } from "bootstrap";

const HomeCarousel = () => {
  return (
    <div>
      <div id="carouselExampleRide" class="carousel slide" data-bs-ride="false">
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="1000">
            <img
              src="https://cdn.pixabay.com/photo/2018/03/11/13/38/munich-3216809_1280.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item" data-bs-interval="1000">
            <img
              src="https://www.ourescapeclause.com/wp-content/uploads/2019/02/NewYorkJan2019-91-1024x683.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item" data-bs-interval="1000">
            <img
              src="https://cdn.pixabay.com/photo/2017/08/07/10/22/buildings-2602324_1280.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default HomeCarousel;