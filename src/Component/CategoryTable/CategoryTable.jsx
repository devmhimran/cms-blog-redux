import React from 'react';
import { VscLinkExternal } from 'react-icons/vsc';
import { AiOutlineDelete } from 'react-icons/ai';

const CategoryTable = ({ data }) => {
    const {categoryName} = data
    return (
        <tr>
            <td className='p-2'>1</td>
            <td className='p-2 text-lg capitalize'>{categoryName}</td>
            <td className='flex p-2'>
                <span><VscLinkExternal className='mx-2 cursor-pointer w-6 h-6' /></span>
                <span><AiOutlineDelete className='mx-2 cursor-pointer w-6 h-6' /></span>
            </td>

        </tr>
    );
};

export default CategoryTable;