import React, { useEffect, useState } from 'react';
import SidebarHeading from '../../Component/SidebarHeading/SidebarHeading';
import PageTitle from '../../Component/PageTitle/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import loadBlogData from '../../Redux/Thunk/loadBlogData';
import BlogTable from '../../Component/BlogTable/BlogTable';
import { yourPostAction } from '../../Redux/actionCreators/dashboardFilter';

const YourBlog = () => {
    const { blog } = useSelector(state => state.blog)
    const  {allPost, yourPost}  = useSelector(state => state.filter.dashboardFilter)
    const [user] = useAuthState(auth)
    const [filter, setFilter] = useState({})
    const dispatch = useDispatch();
    let content;
    useEffect(() => {
        dispatch(yourPostAction())
        dispatch(loadBlogData())
    }, [dispatch])



    if (blog.length) {
        content = [...blog].reverse().filter(post =>  post.userId === user.uid).map((data, index) => <BlogTable key={data._id} index={index} data={data} />)
    } 
    return (
        <div>
            <PageTitle title='Your Blog' />
            <SidebarHeading title='Your Blog' />
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
                            // blog.filter(userId => userId.userId === user.uid ).map((data, index) => <BlogTable key={data._id} index={index} data={data} /> )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default YourBlog;