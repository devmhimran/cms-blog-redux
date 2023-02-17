import React from 'react';
import { BsBookmarkFill } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import TimeConvert from '../TimeConvert/TimeConvert';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import addFavoriteData from '../../Redux/Thunk/addFavoriteData';
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../Pages/firebase.init';
import removeFavoriteData from '../../Redux/Thunk/removeFavorite';

const HomeBlog = ({ data }) => {
    const { _id, blogTitle, featuredImage, content, blogCategory, date } = data
    const [user] = useAuthState(auth)
    const navigate = useNavigate();
    const time = TimeConvert(date)
    const dispatch = useDispatch();
    const { favorite, homeBlog } = useSelector(state => state.blog)
    const [favoriteId, setFavoriteId] = useState('')

    let favoriteActive = 'stroke-1 stroke-red-500 fill-red-500'
    let favoriteBtn = 'fill-white hover:fill-red-500 stroke-1 stroke-black hover:stroke-red-500'
    let favoriteValue;
    if (favorite.length) {
        favoriteValue = favorite.find(data => data.postId === _id)
    }

    const handleFavorite = () => {
        if (user) {
            const favoriteData = {
                userEmail: user.email,
                postId: _id
            }
            dispatch(addFavoriteData(_id, favoriteData))
        }
    }

    const handleFavoriteRemove = () => {
        if (user) {
            dispatch(removeFavoriteData(_id))
        }
    }

    return (
        <div className="card border relative h-[465px] rounded-xl lg:rounded-3xl hover:shadow duration-300">
            <div className="card-body p-3">
                <LazyLoadImage
                    src={featuredImage}
                    alt={blogTitle}
                    effect="blur"
                    className='w-full h-72 object-cover rounded-xl lg:rounded-3xl'
                    loading='eager'
                />
                <div className="blog__date mt-1">
                    <p className='text-gray-500'>Posted on: {time}</p>
                </div>
                <div className="blog__content mt-3">
                    <h2 className='text-xl syne font-bold cursor-pointer hover:text-blue-700 hover:underline' onClick={() => navigate(`/blog/${_id}`)}>{blogTitle.slice(0, 38)}...</h2>
                    <div className='flex items-center justify-between w-11/12 absolute bottom-[15px]'>
                        <p className='my-2 text-base'>Category: <span className='p-1 px-3 border rounded-full'>{blogCategory}</span></p>
                        {
                            favoriteValue ?
                                <span onClick={handleFavoriteRemove}>
                                    <BsBookmarkFill className={`w-5 h-5 stroke-1 stroke-red-500 fill-red-500`} />
                                </span>
                                :
                                <span onClick={handleFavorite}>
                                    <BsBookmarkFill className={`w-5 h-5 fill-white hover:fill-red-500 stroke-1 stroke-black hover:stroke-red-500`} />
                                </span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeBlog;