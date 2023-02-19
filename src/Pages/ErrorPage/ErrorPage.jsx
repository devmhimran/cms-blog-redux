import React from 'react';
import error from '../../assets/error.gif'

const ErrorPage = () => {
    return (
        <div className='h-screen  flex justify-center items-center'>
            <img className='w-10/12 lg:w-[35%]' src={error} alt="" />
        </div>
    );
};

export default ErrorPage;