import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import TimeConvert from '../TimeConvert/TimeConvert';
import { useNavigate } from 'react-router-dom';

const FeaturedPost = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div>
            <Swiper
                modules={[Navigation, Scrollbar, A11y, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {
                    [...data].reverse().filter(data => data.featuredBlog === true).map((featuredBlog) =>

                        <SwiperSlide key={featuredBlog._id} className='border rounded-3xl block sm:w-full md:flex lg:flex h-full md:h-[470px] lg:h-[470px] justify-between'>
                            <div className='p-6 flex items-center w-full md:w-[45%] lg:w-[45%]'>
                                <div className=''>
                                    <p className='my-2 text-base'><span className='p-1 px-3 border rounded-full'>{featuredBlog.blogCategory}</span></p>
                                    <h2 onClick={()=> navigate(`/blog/${featuredBlog._id}`)} className='text-2xl lg:text-4xl font-bold my-6 leading-normal cursor-pointer hover:text-blue-700 hover:underline'>{featuredBlog.blogTitle}</h2>
                                    <p className='text-gray-500'>Posted on: {TimeConvert(featuredBlog.date)}</p>
                                </div>
                            </div>
                            <div className='w-full md:w-[55%] lg:w-[55%] h-[380px] lg:h-100%'>
                                <LazyLoadImage
                                    src={featuredBlog.featuredImage}
                                    alt={featuredBlog.blogTitle}
                                    effect="blur"
                                    className='w-full md:w-[900px] lg:w-[900px] h-[380px] md:h-[470px] lg:h-[470px] object-cover rounded-b-2xl lg:rounded-r-3xl'
                                    loading='eager'
                                />
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    );
};

export default FeaturedPost;