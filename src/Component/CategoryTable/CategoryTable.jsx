import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCategoryData } from '../../Redux/Thunk/deleteCategoryData';

const CategoryTable = ({ data, index }) => {
    const { categoryName, _id } = data
    const dispatch = useDispatch();
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
                <Link to={`/dashboard/update-category/${_id}`}><p>Edit</p></Link>
                <span className='mx-1'>|</span>
                <span onClick={() => handleDelete(_id)}><p>Delete</p></span>
            </td>
        </tr>
    );
};

export default CategoryTable;