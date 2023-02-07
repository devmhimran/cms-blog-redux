import React from 'react';
import PageTitle from '../../Component/PageTitle/PageTitle';
import { useSelector } from 'react-redux';

const Favorite = () => {
    const { favorite } = useSelector(state => state.blog)
    let content;
    
    console.log(favorite)
    return (
        <div className='container max-w-screen-xl lg:mx-auto lg:px-0 px-3 py-12'>
            <PageTitle title='Favorite' />
            <h1 className='text-4xl font-bold syne my-4'>Favorite Post❤️️</h1>

        </div>
    );
};

export default Favorite;