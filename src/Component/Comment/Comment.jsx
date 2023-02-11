import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Pages/firebase.init';
import Loading from '../Loading/Loading';

const Comment = ({ data, postAuthor, id }) => {
    const [user, loading] = useAuthState(auth)
    const [profileUser, setProfileUser] = useState([]);
    const [editForm, setEditForm] = useState(false)
    const [commentId, setCommentId] = useState('')


    useEffect(() => {
        fetch('http://localhost:5000/user')
            .then(res => res.json())
            .then(data => setProfileUser(data))
    }, [])

    // console.log(data._id)
    const handleEditButton = (id) => {
        console.log(id)
        setCommentId(id)
        setEditForm(!editForm)
    }
    const handleEditForm = (e) => {
        e.preventDefault();
        const isProceed = window.confirm('Are you sure to update?')
        const editComment = e.target.editComment.value;
        const blogComment = {
            editComment
        }
        console.log(commentId)

        if (isProceed) {
            fetch(`http://localhost:5000/comment-update/${commentId}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(blogComment)
            })
                .then(res => res.json())
                .then(data => {
                    if (isProceed) {
                        window.location.reload()
                    }
                })
        }
    }
    const handleDeleteButton = (id) => {
        const isProceed = window.confirm('Are you sure to delete?')
        if (isProceed) {
            fetch(`http://localhost:5000/delete-comment/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (isProceed && data.acknowledged) {
                        window.location.reload()
                    }
                })
        }
    }

    return (
        <div className="comment__data flex gap-2 my-6">
            <div className="profile__images w-[15%]">
                {
                    profileUser.filter(profileData => profileData.uid === data.userId).map(data => <img key={data._id} className='w-14 h-14 rounded-full object-cover' src={data.profileImage} alt="" />)
                }
            </div>
            <div className="comment__content p-3 bg-slate-100 rounded-lg w-[80%]">
                <p className='font-semibold'>
                    {
                        profileUser.filter(profileData => profileData.uid === data.userId).map(data => <span key={data._id} className='font-semibold capitalize'>{data.name}</span>)
                    }
                    <small className='text-gray-400'>{data.userId === postAuthor ? ' - Author' : ''}</small>
                    {/* <small className='text-gray-400'>  - {  profileUser.map(profileData => profileData.uid === postAuthor) ? 'author' : '' }</small> */}
                </p>
                {
                    editForm ?
                        <>
                            <div className="comment__edit">
                                <form className='flex gap-2' onSubmit={handleEditForm}>
                                    <input className='placeholder:text-black border p-2 rounded-lg py-1 w-full outline-0 text-base' type="text" name="editComment" defaultValue={data.blogComment} />
                                    <button className='px-3 bg-black text-white rounded-lg'>Done</button>
                                </form>
                            </div>
                        </> : <p className='inter'>{data.blogComment}</p>
                }

                {
                    user.uid === data.userId ?
                        <>
                            <div className="comment__option flex items-center gap-1.5 mt-2">
                                <button className='hover:text-blue-600' onClick={() => handleEditButton(data._id)}>Edit</button>
                                <span className='w-px h-3 bg-gray-500'></span>
                                <button className='hover:text-blue-600' onClick={() => handleDeleteButton(data._id)}>Delete</button>
                            </div>
                        </> : ''
                }


            </div>
        </div>
    );
};

export default Comment;