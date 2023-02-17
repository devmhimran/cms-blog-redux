import React from 'react';
import { VscLinkExternal } from 'react-icons/vsc';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteUserData } from '../../Redux/Thunk/deleteUserData';

const UserData = ({data, index}) => {
    const {_id, name, profileImage, email} = data
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        const proceed = window.confirm('Are your sure?');
        if(proceed){
            dispatch(deleteUserData(_id))
        }
    }
    return (
        <tr className='border-b inter'>
            <td className='p-1.5'>{index + 1}</td>
            <td className='p-1.5'><img className='w-14 h-11 object-cover' src={profileImage} alt="" /></td>
            <td className='font-semibold p-1.5'>{name}</td>
            <td className='font-semibold p-1.5'>{email}</td>
            <td className='p-1.5'>
                <div className=' flex items-center'>
                    <button onClick={()=>handleDelete(_id)}>Delete</button>
                </div>
            </td>
        </tr>
    );
};

export default UserData;