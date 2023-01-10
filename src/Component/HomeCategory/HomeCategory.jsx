import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import loadCategoryData from '../../Redux/Thunk/loadCategoryData';

const HomeCategory = () => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.blog.category)
    useEffect(()=>{
        dispatch(loadCategoryData())
    },[])
    console.log(category)
    return (
        <div>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    category.map(data => <SwiperSlide key={data._id} className='bg-gray-300 px-3 p-1 syne'>{data.categoryName}</SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default HomeCategory;