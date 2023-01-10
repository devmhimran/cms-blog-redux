import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const HomeCategory = () => {
    return (
        <div>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide className='border border-black px-3 p-1'>Slide 1</SwiperSlide>
                <SwiperSlide className='border border-black px-3 p-1'>Slide 2</SwiperSlide>
                <SwiperSlide className='border border-black px-3 p-1'>Slide 3</SwiperSlide>
                <SwiperSlide className='border border-black px-3 p-1'>Slide 4</SwiperSlide>
                <SwiperSlide className='border border-black px-3 p-1'>Slide 5</SwiperSlide>
                <SwiperSlide className='border border-black px-3 p-1'>Slide 6</SwiperSlide>
                <SwiperSlide className='border border-black px-3 p-1'>Slide 7</SwiperSlide>
                <SwiperSlide className='border border-black px-3 p-1'>Slide 8</SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HomeCategory;