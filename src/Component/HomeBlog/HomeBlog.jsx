import React from 'react';
import FlagIcon from '../FlagIcon/FlagIcon';
import { BiBookmark } from 'react-icons/bi';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const HomeBlog = ({ data }) => {
    const { blogTitle, featuredImage, content, blogCategory, date } = data
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
                    <p className='text-gray-500'>Posted on: {date}</p>
                </div>
                <div className="blog__content mt-3">
                    <h2 className='text-xl syne font-bold'>{blogTitle.slice(0, 38)}...</h2>
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