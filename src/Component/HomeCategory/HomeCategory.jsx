import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import loadCategoryData from '../../Redux/Thunk/loadCategoryData';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { filterCategory } from '../../Redux/actionCreators/categoryActionCreators';

const HomeCategory = () => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.blog.category)
    const categorySelected = useSelector(state => state.filter.homePageFilter.filterCategory)
    useEffect(() => {
        dispatch(loadCategoryData())
    }, [])
    const handleSelectCategory = (data) => {
        dispatch(filterCategory(data))
    }
    console.log(categorySelected)
    const categoryClass = 'bg-gray-100 hover:bg-gray-200';
    const categoryActive = 'bg-black text-white'
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
                <SwiperSlide onClick={() => handleSelectCategory('All Post')} className={`${ categorySelected && categorySelected === 'All Post' ? categoryActive : categoryClass} p-2 rounded-lg inter text-base font-normal text-center cursor-pointer`}>All Post</SwiperSlide>
                {
                    category.map(data => <SwiperSlide key={data._id} onClick={() => handleSelectCategory(data.categoryName)} className={`${categorySelected && data.categoryName.includes(categorySelected) ? categoryActive : categoryClass} p-2 rounded-lg inter text-base font-normal text-center cursor-pointer`}>{data.categoryName}</SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default HomeCategory;