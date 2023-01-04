import React from 'react';
import { VscLinkExternal } from 'react-icons/vsc';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import deleteBlogData from '../../Redux/Thunk/deleteBlogData';

const BlogTable = ({ data, index }) => {
    const { _id, featuredImage, blogTitle, blogCategory, date } = data
    const dispatch = useDispatch();
    const handleDelete = (id) =>{
        const proceed = window.confirm('Are your sure?');
        if(proceed){
            dispatch(deleteBlogData(id))
        }
    }
    return (
        <tr className='border-b inter'>
            <td className='p-1.5'>{index + 1}</td>
            <td className='p-1.5'><img className='w-14 h-11' src={featuredImage} alt="" /></td>
            <td className='font-semibold p-1.5'>{blogTitle.slice(0, 60)}...</td>
            <td className='font-semibold p-1.5'>{blogCategory}</td>
            <td className='p-1.5'>{date}</td>
            <td className='p-1.5'>
                <div className=' flex items-center'>
                    <span><VscLinkExternal className='mx-2 cursor-pointer w-5 h-5' /></span>
                    <span onClick={()=> handleDelete(_id)}><AiOutlineDelete className='mx-2 cursor-pointer w-6 h-6' /></span>
                </div>
            </td>
        </tr>
    );
};

export default BlogTable;