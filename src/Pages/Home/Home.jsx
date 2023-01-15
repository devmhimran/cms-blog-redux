import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loadBlogData from '../../Redux/Thunk/loadBlogData';
import HomeBlog from '../../Component/HomeBlog/HomeBlog';
import HomeCategory from '../../Component/HomeCategory/HomeCategory';

const Home = () => {
    const dispatch = useDispatch();
    let content;
    useEffect(() => {
        dispatch(loadBlogData())
    }, [])
    const { blog } = useSelector(state => state.blog)
    const { homePageFilter } = useSelector(state => state.filter)
    // console.log(blog)
    if(blog.length){
        content = blog.map(data => <HomeBlog key={data._id} data={data} />)
    }
    if(blog.length && homePageFilter){
        content = blog.filter(data => {
            if( data ){
                console.log( data.blogCategory === homePageFilter.filterCategory)
                // console.log( homePageFilter)
                return data.blogCategory === homePageFilter.filterCategory
            }
            return data
        })
        .map(data => <HomeBlog key={data._id} data={data} />)
    }

    return (
        <div className='container max-w-screen-xl lg:mx-auto lg:px-0 px-3 pb-20'>
            <div className='py-8'>
                <HomeCategory />
            </div>
            <div className="postHub__blog">
                <div className="grid grid-cols-3 gap-5">
                    {
                        content
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;