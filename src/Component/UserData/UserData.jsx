import React from 'react';
import { VscLinkExternal } from 'react-icons/vsc';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteUserData } from '../../Redux/Thunk/deleteUserData';

const UserData = ({ data, index }) => {
    const { _id, name, profileImage, email } = data
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        const proceed = window.confirm('Are your sure?');
        if (proceed) {
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
                <div className=' flex items-center justify-center gap-2'>
                    <button onClick={() => handleDelete(_id)}>Delete</button>
                    <span className='mx-1'>|</span>
                    <select className='border outline-none rounded-md p-2' name="" id="">
                        <option value="">User</option>
                        <option value="">Admin</option>
                    </select>
                    <span className='mx-1'>|</span>
                    <button className='bg-black text-white py-1.5 px-4 rounded-md'>Save</button>
                </div>
            </td>
        </tr>
    );
};

export default UserData;