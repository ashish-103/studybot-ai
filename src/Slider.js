import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import client from "./images/client.jpg";

const Slider = () => {
  // const swiperParams = {
  //   slidesPerView: 1,
  //   spaceBetween: 10,
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  //   autoplay:
  //   {
  //     delay: 2000,
  //     disableOnInteraction: false,
  //   },
  //   pagination:
  //   {
  //     el: '.swiper-pagination',
  //     clickable: true,
  //   },
  // };

  return (
    <Swiper>
      <SwiperSlide>
        <div className="slider-item">
          <div className="slider-image">
            <img src={client} alt="Client" />
          </div>
          <div className="slide-content">
            <p className="text-justify">
              Studybot AI helped me to identify my weaknesses in subjective
              answers and improve them. I was able to score better in my
              competitive exams because of Studybot AI.
            </p>
            <h2 className="client-name">- John Doe, UPSC aspirant</h2>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slider-item">
          <div className="slider-image">
            <img src={client} alt="Client" />
          </div>
          <div className="slide-content">
            <p className="text-justify">
              Studybot AI is a great tool for students who are preparing for
              competitive exams that require subjective answers. It provides
              valuable feedback on your answers and helps you to improve them."{" "}
            </p>
            <h2 className="client-name">- Jane Doe, IAS aspirant</h2>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slider-item">
          <div className="slider-image">
            <img src={client} alt="Client" />
          </div>
          <div className="slide-content">
            <p className="text-justify">
              Studybot AI helped me to identify my weaknesses in subjective
              answers and improve them. I was able to score better in my
              competitive exams because of Studybot AI.
            </p>
            <h2 className="client-name">- John Doe, UPSC aspirant</h2>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
