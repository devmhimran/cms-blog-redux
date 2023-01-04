import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
        <div className='container mx-auto h-[90vh] flex justify-center items-center'>
            <div className="signin__form">
                <div className="card border w-96 p-6 syne rounded-xl">
                    <div className="card-body">
                        <form>
                            <h2 className='text-xl font-bold mb-4'>Sign In</h2>
                            <div className="input__form py-2">
                                <label htmlFor="email" className='text-gray-800 font-semibold'>Enter your email</label>
                                <input className='placeholder:text-black  border border-[#C7C9D1] px-3 rounded-full py-1 w-full outline-0 text-base' type="email" name="email" id="email" required />
                            </div>
                            <div className="input__form py-2">
                                <label htmlFor="email" className='text-gray-800 font-semibold'>Enter your password</label>
                                <input className='placeholder:text-black  border border-[#C7C9D1] px-3 rounded-full py-1 w-full outline-0 text-base' type="password" name="password" id="password" required />
                                <Link className='mb-2 text-blue-600'>Forgot Password?</Link>
                            </div>
                            <div className="input__form py-2.5">
                                <button className='bg-black text-white px-5 py-2 hover:bg-white hover:text-black border border-black rounded-full duration-300' to='/sign-in'>Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;