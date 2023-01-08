import React, { useEffect } from 'react';
import SidebarHeading from '../../Component/SidebarHeading/SidebarHeading';
import { useDispatch, useSelector } from 'react-redux';
import loadBlogData from '../../Redux/Thunk/loadBlogData';
import BlogTable from '../../Component/BlogTable/BlogTable';
import PageTitle from '../../Component/PageTitle/PageTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const AllBlog = () => {
    const { blog } = useSelector(state => state.blog)
    const [user] = useAuthState(auth)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadBlogData())
    }, [dispatch])
    return (
        <div className=''>
            <PageTitle title='All Blog' />
            <SidebarHeading title='All Blogs' />
            <div className="w-full py-6 inter">
                <div className="btn__group my-2">
                    <button className='bg-black text-white px-5 py-1.5 hover:bg-white hover:text-black border border-black rounded-full duration-300 mr-2'>All Posts</button>
                    <button className='bg-white text-black px-5 py-1.5 border border-black rounded-full duration-300'>Your Posts</button>
                </div>
                <table className='w-full table-auto'>
                    <thead className='bg-black text-white'>
                        <tr>
                            <th className='text-left'>#</th>
                            <th className='text-left'>Image</th>
                            <th className='text-left'>Title</th>
                            <th className='text-left'>Category</th>
                            <th className='text-left'>Date</th>
                            <th className='text-left'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            blog.filter(userId =>userId.userId === user.uid ).map((data, index) => <BlogTable key={data._id} index={index} data={data} /> )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBlog;