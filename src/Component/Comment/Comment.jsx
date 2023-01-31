import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Pages/firebase.init';
import Loading from '../Loading/Loading';

const Comment = ({ data, postAuthor, id }) => {
    const [user, loading] = useAuthState(auth)
    const [profileUser, setProfileUser] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/user')
            .then(res => res.json())
            .then(data => setProfileUser(data))
    }, [])

    let author = profileUser.filter(profileData => profileData.uid === postAuthor)

    return (
        <div className="comment__data flex gap-2 my-6">
            <div className="profile__images w-[15%]">
                {
                    profileUser.filter(profileData => profileData.uid === data.userId).map(data => <img key={data._id} className='w-14 h-14 rounded-full object-cover' src={data.profileImage} alt="" />)
                    // profileUser.filter(profileData => console.log(profileData))
                }

            </div>
            <div className="comment__content p-3 bg-slate-100 rounded-lg w-[80%]">
                <p className='font-semibold'>
                    {
                        profileUser.filter(profileData => profileData.uid === data.userId).map(data => <span key={data._id} className='font-semibold capitalize'>{data.name}</span>)
                    }
                    {/* {
                        profileUser.filter(data => data.uid === user.uid).map(data => <span className='font-semibold capitalize'>{data.name}</span> )
                    } */}

                    <small className='text-gray-400'>{data.userId === postAuthor ? ' - Author' : ''}</small>
                    {/* <small className='text-gray-400'>  - {  profileUser.map(profileData => profileData.uid === postAuthor) ? 'author' : '' }</small> */}
                </p>
                <p className='inter'>{data.blogComment}</p>
                {
                    user.uid === data.userId ?
                        <>
                            <div className="comment__option flex items-center gap-1.5 mt-2">
                                <button className='hover:text-blue-600'>Edit</button>
                                <span className='w-px h-3 bg-gray-500'></span>
                                <button className='hover:text-blue-600'>Delete</button>
                            </div>
                        </> : ''
                }

            </div>
        </div>
    );
};

export default Comment;