import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import loadCategoryData from '../../Redux/Thunk/loadCategoryData';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const HomeCategory = () => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.blog.category)
    useEffect(() => {
        dispatch(loadCategoryData())
    }, [])
    console.log(category)
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={5}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    category.map(data => <SwiperSlide key={data._id} className='bg-gray-100 p-2 rounded-lg inter text-base hover:bg-gray-200 font-normal text-center'>{data.categoryName}</SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default HomeCategory;