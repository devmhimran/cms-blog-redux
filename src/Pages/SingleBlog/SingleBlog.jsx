import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../Component/PageTitle/PageTitle';

const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/blog/${id}`)
            .then(res => res.json())
            .then(data => setBlog(data))
    }, [id])
    console.log(blog)
    return (
        <div className='container max-w-screen-xl lg:mx-auto lg:px-0 px-3 py-20'>
            <PageTitle title={`${blog.blogTitle}`} />
            <div className="flex gap-6">
                <div className="w-3/5 border p-6 rounded-2xl">
                    <h1 className='text-4xl font-bold mb-4 syne'>{blog.blogTitle}</h1>
                    <img className='w-full' src={blog.featuredImage} alt="" />
                    <p className='inter mt-6' dangerouslySetInnerHTML={{ __html: blog.content }} ></p>
                </div>
                <div className='w-2/5 border p-6 rounded-2xl'>

                </div>
            </div>
        </div>
    );
};

export default SingleBlog;