import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import './styles.css';
import { Pagination } from 'swiper';
import { Link } from "react-router-dom";
const FeaturedSlider = ({ products }) => {
  return (

    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className=""
      >
        {products.map((product) => {
          const { _id, images, name, price } = product;
          return (
            <SwiperSlide key={_id} className="">
              <Link
                to={`/product/${_id}`}
              >
                <img src={images[0].url} alt={name} />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper >
    </>

  );
};

export default FeaturedSlider;
