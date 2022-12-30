import React from 'react';
import { VscLinkExternal } from 'react-icons/vsc';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteCategory, updateCategory } from '../../Redux/actionCreators/categoryActionCreators';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCategoryData } from '../../Redux/Thunk/deleteCategoryData';

const CategoryTable = ({ data, index }) => {
    const { categoryName, _id } = data
    // console.log(_id)


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDelete = (id) => {
        const proceed = window.confirm('Are your sure?');
        if(proceed){
            dispatch(deleteCategoryData(id))
        }
    }
    return (
        <tr>
            <td className='p-2'>{index + 1}</td>
            <td className='p-2 text-lg capitalize'>{categoryName}</td>
            <td className='flex items-center p-2'>
                <Link to={`/dashboard/update-category/${_id}`}><VscLinkExternal className='mx-2 cursor-pointer w-5 h-5' /></Link>
                {/* <span onClick={() => navigate(`/dashboard/update-category/${_id}`)}><VscLinkExternal className='mx-2 cursor-pointer w-5 h-5' /></span> */}
                <span onClick={() => handleDelete(_id)}><AiOutlineDelete className='mx-2 cursor-pointer w-6 h-6' /></span>
            </td>

        </tr>
    );
};

export default CategoryTable;