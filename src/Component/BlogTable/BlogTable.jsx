import React from 'react';
import { VscLinkExternal } from 'react-icons/vsc';
import { AiOutlineDelete } from 'react-icons/ai';

const BlogTable = ({ data, index }) => {
    const { _id, featuredImage, blogTitle, blogCategory, date } = data
    return (
        <tr className='border-b inter'>
            <td className='py-1.5'>{index + 1}</td>
            <td className='py-1.5'><img className='w-14 h-11' src={featuredImage} alt="" /></td>
            <td className='font-semibold py-1.5'>{blogTitle.slice(0, 60)}...</td>
            <td className='font-semibold py-1.5'>{blogCategory}</td>
            <td className='py-1.5'>{date}</td>
            <td className='py-1.5'>
                <div className=' flex items-center'>
                    <span><VscLinkExternal className='mx-2 cursor-pointer w-5 h-5' /></span>
                    <span><AiOutlineDelete className='mx-2 cursor-pointer w-6 h-6' /></span>
                </div>
            </td>
        </tr>
    );
};

export default BlogTable;