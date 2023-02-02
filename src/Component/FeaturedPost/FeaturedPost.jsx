import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import TimeConvert from '../TimeConvert/TimeConvert';

const FeaturedPost = ({ data }) => {
    // const { _id, blogTitle, featuredImage, content, blogCategory, date } = data
    let blogContent;
    // const time = TimeConvert(date)
    return (
        <div>
            <Swiper
                modules={[Navigation, Scrollbar, A11y, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    [...data].reverse().slice(3, 6).map((featuredBlog) =>

                        <SwiperSlide key={featuredBlog._id} className='border rounded-3xl flex justify-between'>
                            <div className='p-6 flex items-center w-[45%]'>
                                <div className=''>
                                    <p className='my-2 text-base'><span className='p-1 px-3 border rounded-full'>{featuredBlog.blogCategory}</span></p>
                                    <h2 className='text-4xl font-bold my-6 leading-normal'>{featuredBlog.blogTitle}</h2>
                                    <p className='text-gray-500'>Posted on: {TimeConvert(featuredBlog.date)}</p>
                                </div>
                            </div>
                            <div className='w-[55%]'>
                                <LazyLoadImage
                                    src={featuredBlog.featuredImage}
                                    alt={featuredBlog.blogTitle}
                                    effect="blur"

                                    className='w-[900px] h-[450px] object-cover rounded-r-3xl'
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