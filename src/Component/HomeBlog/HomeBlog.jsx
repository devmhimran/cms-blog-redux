import React from 'react';
import FlagIcon from '../FlagIcon/FlagIcon';
import { BiBookmark } from 'react-icons/bi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import TimeConvert from '../TimeConvert/TimeConvert';

const HomeBlog = ({ data }) => {
    const { _id, blogTitle, featuredImage, content, blogCategory, date } = data
    const navigate = useNavigate();
    const time = TimeConvert(date)
    return (
        <div className="card border relative h-[465px] rounded-3xl hover:shadow duration-300">
            <div className="card-body p-3">
                <LazyLoadImage
                    src={featuredImage}
                    alt={blogTitle}
                    effect="blur"
                    className='w-full h-72 object-cover rounded-2xl'
                    loading='eager'
                />
                <div className="blog__date mt-1">
                    <p className='text-gray-500'>Posted on: {time}</p>
                </div>
                <div className="blog__content mt-3">
                    <h2 className='text-xl syne font-bold cursor-pointer hover:text-blue-700 hover:underline' onClick={() => navigate(`/blog/${_id}`)}>{blogTitle.slice(0, 38)}...</h2>
                    <div className='flex items-center justify-between w-11/12 absolute bottom-[15px]'>
                        <p className='my-2 text-base'>Category: <span className='p-1 px-3 border rounded-full'>{blogCategory}</span></p>
                        <BiBookmark className='text-xl hover:text-red-500 hover:fill-red-500' />
                    </div>
                    {/* <p className='inter' dangerouslySetInnerHTML={{__html: content.slice(0,10)}} ></p> */}
                </div>
            </div>
        </div>
    );
};

export default HomeBlog;