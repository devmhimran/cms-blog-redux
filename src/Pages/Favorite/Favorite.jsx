import React, { useEffect } from 'react';
import PageTitle from '../../Component/PageTitle/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import HomeBlog from '../../Component/HomeBlog/HomeBlog';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import homeBlogData from '../../Redux/Thunk/homeBlog';
import loadFavoriteData from '../../Redux/Thunk/loadFavorite';

const Favorite = () => {
    const { favorite, homeBlog } = useSelector(state => state.blog)
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    let content;

    useEffect(() => {
        dispatch(loadFavoriteData(user.email))
        dispatch(homeBlogData())
    }, [user])

    if (favorite.length) {
        const output = getMatchingObjects(homeBlog, favorite)
        function getMatchingObjects(array1, array2) {
            const matchingObjects = [];
            for (let i = 0; i < array1.length; i++) {
                for (let j = 0; j < array2.length; j++) {
                    if (JSON.stringify(array1[i]._id) === JSON.stringify(array2[j].postId)) {
                        matchingObjects.push(array1[i]);
                    }
                }
            }
            return matchingObjects;
        }
    
        content = output.map(data => <HomeBlog key={data._id} data={data} />)
    }

    if (favorite.length === 0) {
        content =
            <>
                <div className='h-[67vh]'>
                    <h1 className='font-bold text-5xl text-gray-500 mt-16'>No Favorite Yet</h1>
                </div>
            </>
    }

    return (
        <div className='container max-w-screen-xl lg:mx-auto lg:px-0 px-3 py-12'>
            <PageTitle title='Favorite' />
            <h1 className='text-4xl font-bold syne my-4'>Favorite Post❤️️</h1>
            <div className="postHub__blog">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        content
                    }
                </div>
            </div>
        </div>
    );
};

export default Favorite;