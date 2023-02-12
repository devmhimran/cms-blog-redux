import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import loadCategoryData from '../../Redux/Thunk/loadCategoryData';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { categoryFilter, homeAllPost } from '../../Redux/actionCreators/actionCreators';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const HomeCategory = () => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.blog.category)
    const {filterCategory, allPost} = useSelector(state => state.filter.homePageFilter)
    useEffect(() => {
        dispatch(loadCategoryData())
    }, [])
    const handleSelectCategory = (data) => {
        dispatch(categoryFilter(data))
    }
    // console.log(filterCategory)
    const categoryClass = 'bg-gray-100 hover:bg-gray-200';
    const categoryActive = 'bg-black text-white'
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={20}
                slidesPerView={5}
                navigation
                // autoplay={{
                //     delay: 2000,
                //     disableOnInteraction: false,
                //   }}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide onClick={() => dispatch(homeAllPost())} className={`${ allPost ? categoryActive : categoryClass} p-2 rounded-lg inter text-sm lg:text-base font-normal text-center cursor-pointer`}>All Post</SwiperSlide>
                {
                    category.map(data => <SwiperSlide key={data._id} onClick={() => handleSelectCategory(data.categoryName)} className={`${filterCategory && data.categoryName.includes(filterCategory) ? categoryActive : categoryClass} p-2 rounded-lg inter text-sm lg:text-base font-normal text-center cursor-pointer`}>{data.categoryName}</SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default HomeCategory;