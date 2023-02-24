import React, { useEffect, useState } from 'react';
import PageTitle from '../../Component/PageTitle/PageTitle';
import SidebarHeading from '../../Component/SidebarHeading/SidebarHeading';
import UserData from '../../Component/UserData/UserData';
import { useDispatch, useSelector } from 'react-redux';
import loadUsersData from '../../Redux/Thunk/loadUsers';

const AllUsers = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(loadUsersData())
    }, [])

    let content;
    if (users) {
        content = users.map((data, index) => <UserData key={data._id} index={index} data={data}></UserData>)
    }

    return (
        <div>
            <PageTitle title='All Users' />
            <SidebarHeading title='All Users' />
            <div className="w-full py-6 inter">
                <table className='w-full table-auto'>
                    <thead className='bg-black text-white'>
                        <tr>
                            <th className='text-left'>#</th>
                            <th className='text-left'>Image</th>
                            <th className='text-left'>Name</th>
                            <th className='text-left'>Email</th>
                            <th className='text-center'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            content
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;