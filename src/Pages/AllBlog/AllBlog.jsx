import React, { useEffect } from 'react';
import SidebarHeading from '../../Component/SidebarHeading/SidebarHeading';
import { useDispatch, useSelector } from 'react-redux';
import loadBlogData from '../../Redux/Thunk/loadBlogData';
import BlogTable from '../../Component/BlogTable/BlogTable';
import PageTitle from '../../Component/PageTitle/PageTitle';

const AllBlog = () => {
    const { blog } = useSelector(state => state.blog)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadBlogData())
    }, [dispatch])
    return (
        <div className=''>
            <PageTitle title='All Blog' />
            <SidebarHeading title='All Blogs' />
            <div className="w-full py-6 inter">
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
                            blog.map((data, index) => <BlogTable key={data._id} index={index} data={data} /> )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBlog;