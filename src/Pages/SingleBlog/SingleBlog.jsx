import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../Component/PageTitle/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import homeBlogData from '../../Redux/Thunk/homeBlog';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/css';
import HomeBlog from '../../Component/HomeBlog/HomeBlog';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import addCommentData from '../../Redux/Thunk/AddCommentData';
import loadCommentData from '../../Redux/Thunk/loadCommentData';
import Comment from '../../Component/Comment/Comment';
import Loading from '../../Component/Loading/Loading';
import TimeConvert from '../../Component/TimeConvert/TimeConvert';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { signOut } from 'firebase/auth';
import { emptyFavorite } from '../../Redux/actionCreators/actionCreators';

const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState([]);
    const dispatch = useDispatch();
    const [user, loading] = useAuthState(auth)
    const [profileUser, setProfileUser] = useState([]);
    const time = TimeConvert(blog.date)

    useEffect(() => {
        fetch(`https://cms-blog-redux-server.vercel.app/blog/${id}`, {
            method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    dispatch(emptyFavorite())
                    localStorage.removeItem('accessToken');
                }
                return res.json()
            })
            .then(data => setBlog(data))
    }, [id])

    useEffect(() => {
        fetch('https://cms-blog-redux-server.vercel.app/user')
            .then(res => res.json())
            .then(data => setProfileUser(data))
    }, [])

    let content;

    useEffect(() => {
        dispatch(homeBlogData())
    }, [])

    useEffect(() => {
        dispatch(loadCommentData())
    }, [])



    const { homeBlog } = useSelector(state => state.blog)
    const { comment } = useSelector(state => state.comment)


    const handleComment = (e) => {
        e.preventDefault();
        const blogComment = e.target.blogComment.value;
        const commentData = {
            postId: id,
            userId: user.uid,
            blogComment
        }
        dispatch(addCommentData(commentData))
        e.target.reset()
    }

    const value = profileUser.find(data => blog.userId === data.uid)

    let commentContent;
    const commentFIlter = comment.filter(data => data.postId === id)
    if (comment.length && commentFIlter) {
        commentContent = commentFIlter.map(data => <Comment key={data._id} postAuthor={blog.userId} data={data} postId={id} />)
    }

    if (commentFIlter.length === 0) {
        commentContent = <><p className='font-semibold text-gray-500 mt-4'>No Comment</p></>
    }

    if (loading) {
        return <Loading />
    }
    return (
        <div className='container max-w-screen-xl lg:mx-auto lg:px-0 px-3 py-20'>
            <PageTitle title={`${blog.blogTitle}`} />
            <div className="block lg:flex gap-6">
                <div className="w-full lg:w-3/5 border p-6 rounded-2xl">
                    <h1 className='text-2xl lg:text-4xl font-bold mb-4 syne'>{blog.blogTitle}</h1>
                    <div className="author__detail my-3 flex items-center justify-between">
                        <div className=' flex items-center gap-3'>
                            <LazyLoadImage
                                src={value ? value.profileImage : ''}
                                alt={value ? value.name : ''}
                                // effect="blur"
                                className='w-10 h-10 rounded-full object-cover'
                                loading='eager'
                            />
                            <p className='capitalize font-semibold text-lg lg:text-2xl'>{value ? value.name : ''}</p>
                        </div>
                        <div className="date">
                            <p>{time}</p>
                        </div>
                    </div>
                    <LazyLoadImage
                        src={blog.featuredImage}
                        alt={blog.blogTitle}
                        effect="blur"
                        className='w-full'
                        loading='eager'
                    />
                    <p className='inter mt-6' dangerouslySetInnerHTML={{ __html: blog.content }} ></p>
                </div>
                <div className='w-full lg:w-2/5 h-[600px] border p-6 rounded-2xl lg:mt-0 mt-6'>
                    <div className="blog__comment__content">
                        <form onSubmit={handleComment}>
                            <textarea className='resize-none rounded-xl border outline-0 w-full h-40 p-4 mb-2 inter' name="blogComment" placeholder='Place your comment'></textarea>
                            <button className='bg-black text-white px-5 py-2 hover:bg-white hover:text-black border border-black rounded-full duration-300'>Comment</button>
                        </form>
                        <div className='overflow-y-auto h-80 mt-5'>
                            {
                                commentContent
                            }
                        </div>
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
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 50,
                            },
                        }}
                        className="mySwiper"
                    >
                        {
                            [...homeBlog].reverse().filter(data => data.blogCategory === blog.blogCategory).filter(data => data._id !== id).map(blogData =>

                                <SwiperSlide className='' key={blogData._id}>
                                    <HomeBlog data={blogData} />
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;