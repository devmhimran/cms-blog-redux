import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loadBlogData from '../../Redux/Thunk/loadBlogData';
import HomeBlog from '../../Component/HomeBlog/HomeBlog';
import HomeCategory from '../../Component/HomeCategory/HomeCategory';
import { homeAllPost, loadHomeBlog } from '../../Redux/actionCreators/actionCreators';
import homeBlogData from '../../Redux/Thunk/homeBlog';
import FeaturedPost from '../../Component/FeaturedPost/FeaturedPost';
import PageTitle from '../../Component/PageTitle/PageTitle';

const Home = () => {
    const dispatch = useDispatch();

    let content;
    useEffect(() => {
        dispatch(homeBlogData())
    }, [dispatch])

    useEffect(() => {
        dispatch(homeAllPost())
    }, [])
    const { homeBlog } = useSelector(state => state.blog)
    const { homePageFilter } = useSelector(state => state.filter)
    const paginationActive = 'bg-black text-white'
    // console.log(homePageFilter.allPost)

    if (homeBlog.length) {
        content = [...homeBlog].reverse().map(data => <HomeBlog key={data._id} data={data} />)
        console.log(content)
    }
    if (homeBlog.length && homePageFilter.allPost) {
        content = [...homeBlog].reverse().map(data => <HomeBlog key={data._id} data={data} />)
    }
    const blogFilter = homeBlog.filter(data => data.blogCategory === homePageFilter.filterCategory)


    if (homeBlog.length && homePageFilter.filterCategory) {
        content = homeBlog.filter(data => {
            if (data) {
                return data.blogCategory === homePageFilter.filterCategory
            }
            return data
        })
            .reverse().map(data => <HomeBlog key={data._id} data={data} />)
    }
    if (blogFilter.length === 0 && homePageFilter.allPost === false) {
        content = <>
            <div className='h-[65vh]'>
                <h1 className='font-bold text-5xl text-gray-500 mt-16'>No Blog Post Yet</h1>
            </div>
        </>
    }
    return (
        <div className='container max-w-screen-xl lg:mx-auto lg:px-0 px-3 pb-20'>
            <PageTitle title='Home' />
            <div className='py-10'>
                <HomeCategory />
            </div>
            <div className="pb-10">
                <div className="featured__post">

                    {homePageFilter.allPost &&
                        <>
                            <h1 className='text-4xl font-bold syne my-4'>Featured Post📌</h1>
                            <FeaturedPost data={homeBlog} />
                        </>
                    }
                </div>
            </div>
            <div className="postHub__blog">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        content
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;