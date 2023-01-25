import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../Component/PageTitle/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import homeBlogData from '../../Redux/Thunk/homeBlog';
import { homeAllPost } from '../../Redux/actionCreators/actionCreators';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/css';
import HomeBlog from '../../Component/HomeBlog/HomeBlog';

const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(`http://localhost:5000/blog/${id}`)
            .then(res => res.json())
            .then(data => setBlog(data))
    }, [id])

    let content;
    useEffect(() => {
        dispatch(homeBlogData())
    }, [])

    const { homeBlog } = useSelector(state => state.blog)
    console.log(homeBlog)
    return (
        <div className='container max-w-screen-xl lg:mx-auto lg:px-0 px-3 py-20'>
            <PageTitle title={`${blog.blogTitle}`} />
            <div className="flex gap-6">
                <div className="w-3/5 border p-6 rounded-2xl">
                    <h1 className='text-4xl font-bold mb-4 syne'>{blog.blogTitle}</h1>
                    <img className='w-full' src={blog.featuredImage} alt="" />
                    <p className='inter mt-6' dangerouslySetInnerHTML={{ __html: blog.content }} ></p>
                </div>
                <div className='w-2/5 h-[600px] border p-6 rounded-2xl'>
                    <div className="blog__comment__content">
                        <form>
                            <textarea className='resize-none rounded-xl border outline-0 w-full h-40 p-4 mb-2 inter' name="blogComment" placeholder='Place your comment'></textarea>
                            <button className='bg-black text-white px-5 py-2 hover:bg-white hover:text-black border border-black rounded-full duration-300'>Comment</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="related__blog py-10">
                <h1 className='text-4xl font-bold syne mb-6'>Related Post📝</h1>
                <div className="related__blog__content">
                    <Swiper
                        modules={[Navigation, Scrollbar, A11y, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={3}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {
                            [...homeBlog].reverse().filter(data => data.blogCategory === blog.blogCategory).map(blogData =>

                                <SwiperSlide className=''>
                                    <HomeBlog data={blogData} />
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;