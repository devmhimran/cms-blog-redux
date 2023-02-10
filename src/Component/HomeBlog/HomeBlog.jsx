import React from 'react';
import FlagIcon from '../FlagIcon/FlagIcon';
import { BiBookmark } from 'react-icons/bi';
import { BsBookmarkFill } from 'react-icons/bs';
import { ImBookmark } from 'react-icons/im';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import TimeConvert from '../TimeConvert/TimeConvert';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, removeToFavorite } from '../../Redux/actionCreators/actionCreators';
import { useState } from 'react';
import addFavoriteData from '../../Redux/Thunk/addFavoriteData';
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../Pages/firebase.init';

const HomeBlog = ({ data }) => {
    const { _id, blogTitle, featuredImage, content, blogCategory, date } = data
    const [user] = useAuthState(auth)
    const navigate = useNavigate();
    const time = TimeConvert(date)
    const dispatch = useDispatch();
    const { favorite, homeBlog } = useSelector(state => state.blog)
    // let favoriteBtn;
    // const [favorite, setFavorite] = useState(false)
    const [favoriteId, setFavoriteId] = useState('')

    let favoriteActive = 'stroke-1 stroke-red-500 fill-red-500'
    let favoriteBtn = 'fill-white hover:fill-red-500 stroke-1 stroke-black hover:stroke-red-500'

    // if(favorite){
    //     favoriteBtn = 'stroke-1 stroke-red-500 fill-red-500'
    // }else{
    //     favoriteBtn = 'fill-white hover:fill-red-500 stroke-1 stroke-black hover:stroke-red-500'
    // }

    // console.log(value)
    let f;

    // const fValue = value.filter(data => console.log(typeof(data)))
    // const favoriteValue = value.includes(_id)
    // const favoriteValue = value.map(data => data.postId.includes(_id))
    // .includes(_id)
    let favoriteValue;
    if (favorite.length) {
        favoriteValue = favorite.find(data => data.postId === _id)
    }
    // console.log(favoriteValue)

    // setFavorite(favoriteValue)
    const handleFavorite = () => {
        if (user) {
            const favoriteData = {
                uid: user.uid,
                postId: _id
            }
            dispatch(addFavoriteData(_id, favoriteData))
        }
    }

    const handleFavoriteRemove = () =>{
        if (user) {
            const favoriteData = {
                uid: user.uid,
                postId: _id
            }
            dispatch(removeToFavorite(_id))
        }
    }
    // console.log(f)

    // const favoriteValue = value.includes(_id)
    // setFavorite(favoriteValue)

    return (
        <div className="card border relative h-[465px] rounded-3xl hover:shadow duration-300">
            <div className="card-body p-3">
                <LazyLoadImage
                    src={featuredImage}
                    alt={blogTitle}
                    effect="blur"
                    className='w-full h-72 object-cover rounded-2xl'
                    loading='eager'
                />
                <div className="blog__date mt-1">
                    <p className='text-gray-500'>Posted on: {time}</p>
                </div>
                <div className="blog__content mt-3">
                    <h2 className='text-xl syne font-bold cursor-pointer hover:text-blue-700 hover:underline' onClick={() => navigate(`/blog/${_id}`)}>{blogTitle.slice(0, 38)}...</h2>
                    <div className='flex items-center justify-between w-11/12 absolute bottom-[15px]'>
                        <p className='my-2 text-base'>Category: <span className='p-1 px-3 border rounded-full'>{blogCategory}</span></p>

                        {/* <span onClick={handleFavorite}>
                            <BsBookmarkFill className={`w-5 h-5 ${favoriteValue ? favoriteActive : favoriteBtn}`} />
                        </span> */}

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
                    {/* <p className='inter' dangerouslySetInnerHTML={{__html: content.slice(0,10)}} ></p> */}
                </div>
            </div>
        </div>
    );
};

export default HomeBlog;