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

    console.log(profileUser)
    let author = profileUser.filter(profileData => profileData.userId === data.userId)

    

    return (
        <div className="comment__data flex gap-2 my-6">
            <div className="profile__images w-[15%]">
                {
                    profileUser.filter(profileData => profileData.uid === data.userId).map(data => <img className='w-14 h-14 rounded-full object-cover' src={data.profileImage} alt="" />)
                }
                
            </div>
            <div className="comment__content p-3 bg-slate-100 rounded-lg w-[80%]">
                <p className='font-semibold'>
                    {
                        profileUser.filter(data => data.uid === postAuthor).map(data => <span key={data._id} className='font-semibold capitalize'>{data.name}</span>)
                    }
                    {/* {
                        profileUser.filter(data => data.uid === user.uid).map(data => <span className='font-semibold capitalize'>{data.name}</span> )
                    } */}
                    
                    <small className='text-gray-400'>  - { author ? 'Author' : '' }</small>
                </p>
                <p className='inter'>{data.blogComment}</p>
            </div>
        </div>
    );
};

export default Comment;