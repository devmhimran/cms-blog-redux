import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loadBlogData from '../../Redux/Thunk/loadBlogData';
import HomeBlog from '../../Component/HomeBlog/HomeBlog';
import HomeCategory from '../../Component/HomeCategory/HomeCategory';
import { homeAllPost } from '../../Redux/actionCreators/actionCreators';

import Pagination from '../../Component/Pagination/Pagination';

const Home = () => {
    const dispatch = useDispatch();
    let content;
    useEffect(() => {
        dispatch(loadBlogData())
        dispatch(homeAllPost())
    }, [])
    const { blog } = useSelector(state => state.blog)
    const { homePageFilter } = useSelector(state => state.filter)
    const paginationActive = 'bg-black text-white'
    // console.log(homePageFilter.allPost)

    if (blog.length) {
        content = [...blog].reverse().map(data => <HomeBlog key={data._id} data={data} />)
        console.log(content)
    }
    if (blog.length && homePageFilter.allPost) {
        content = [...blog].reverse().map(data => <HomeBlog key={data._id} data={data} />)
    }
    const blogFilter = blog.filter(data => data.blogCategory === homePageFilter.filterCategory)


    if (blog.length && homePageFilter.filterCategory) {
        content = blog.filter(data => {
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
            <div className='py-8'>
                <HomeCategory />
            </div>
            <div className="postHub__blog">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        content
                    }
                </div>
            </div>
            <Pagination/>
        </div>
    );
};

export default Home;