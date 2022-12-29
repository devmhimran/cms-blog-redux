import React from 'react';
import { VscLinkExternal } from 'react-icons/vsc';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../Redux/actionCreators/categoryActionCreators';

const CategoryTable = ({ data, index }) => {
    const {categoryName, _id} = data
    console.log(_id)
    const dispatch = useDispatch();
    return (
        <tr>
            <td className='p-2'>{index + 1}</td>
            <td className='p-2 text-lg capitalize'>{categoryName}</td>
            <td className='flex items-center p-2'>
                <span><VscLinkExternal className='mx-2 cursor-pointer w-5 h-5' /></span>
                <span onClick={()=> dispatch(deleteCategory(_id))}><AiOutlineDelete className='mx-2 cursor-pointer w-6 h-6' /></span>
            </td>

        </tr>
    );
};

export default CategoryTable;