import React, { useEffect, useState } from 'react';
import SidebarHeading from '../../Component/SidebarHeading/SidebarHeading';
import { useDispatch, useSelector } from 'react-redux';
import loadBlogData from '../../Redux/Thunk/loadBlogData';
import BlogTable from '../../Component/BlogTable/BlogTable';
import PageTitle from '../../Component/PageTitle/PageTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Pagination from '../../Component/Pagination/Pagination';
import Loading from '../../Component/Loading/Loading';
import { fetchStart } from '../../Redux/actionCreators/actionCreators';

const AllBlog = () => {
    const { blog, loading, error } = useSelector(state => state.blog)
    const { allPost, yourPost } = useSelector(state => state.filter.dashboardFilter)
    const dispatch = useDispatch();
    const { pageNum } = useSelector(state => state.blog)
    let content;

    if(loading){
        content = <Loading/>
    }
    useEffect(() => {
        dispatch(fetchStart())
        dispatch(loadBlogData())
    }, [pageNum || dispatch])

    if (blog.length && allPost) {
        content = [...blog].map((data, index) => <BlogTable key={data._id} index={index} data={data} />)
    }
    const activeBtn = 'bg-black text-white px-5 py-1.5 border border-black rounded-full duration-300'
    const nonActiveBtn = 'bg-white text-black px-5 py-1.5 hover:bg-black hover:text-white border border-black rounded-full duration-300'

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
                            content
                        }
                    </tbody>
                </table>
            </div>
            <Pagination />
        </div>
    );
};

export default AllBlog;