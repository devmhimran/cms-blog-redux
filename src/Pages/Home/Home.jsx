import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loadBlogData from '../../Redux/Thunk/loadBlogData';
import HomeBlog from '../../Component/HomeBlog/HomeBlog';
import HomeCategory from '../../Component/HomeCategory/HomeCategory';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadBlogData())
    }, [])
    const { blog } = useSelector(state => state.blog)
    console.log(blog)
    return (
        <div className='container max-w-screen-xl lg:mx-auto lg:px-0 px-3 pb-20'>
            <div className='py-8'>
                <HomeCategory />
            </div>
            <div className="postHub__blog">
                <div className="grid grid-cols-3 gap-5">
                    {
                        blog.map(data => <HomeBlog key={data._id} data={data} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;