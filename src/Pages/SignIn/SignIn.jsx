import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Loading from '../../Component/Loading/Loading';
import PageTitle from '../../Component/PageTitle/PageTitle';

const SignIn = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    let errorMessage;
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(email, password)
    }
    if(loading){
        return <Loading></Loading>
    }
    if (error) {
        errorMessage = error?.message
    }
    
    let from = location.state?.from?.pathname || "/dashboard";
    if (user) {
        navigate(from, { replace: true });
    }
    
    return (
        <div className='container mx-auto h-[90vh] flex justify-center items-center'>
            <PageTitle title='Sign In' />
            <div className="signin__form">
                <div className="card border w-96 p-6 syne rounded-xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <h2 className='text-xl font-bold mb-4'>Sign In</h2>
                            <div className="input__form py-2">
                                <label htmlFor="email" className='text-gray-800 font-semibold'>Enter your email</label>
                                <input className='placeholder:text-black  border border-[#C7C9D1] px-3 rounded-full py-1 w-full outline-0 text-base' type="email" name="email" id="email" required />
                            </div>
                            <div className="input__form py-2">
                                <label htmlFor="email" className='text-gray-800 font-semibold'>Enter your password</label>
                                <input className='placeholder:text-black  border border-[#C7C9D1] px-3 rounded-full py-1 w-full outline-0 text-base' type="password" name="password" id="password" required />
                                <Link className='mb-2 text-blue-600' to='/forgot-password'>Forgot Password?</Link>
                                <div className="errorMsg">
                                    <small className='text-red-500'>{errorMessage}</small>
                                </div>
                            </div>
                            <div className="input__form py-2.5">
                                <button className='bg-black text-white px-5 py-2 hover:bg-white hover:text-black border border-black rounded-full duration-300' to='/sign-in'>Sign In</button>
                            </div>
                            <div className="input__form pt-2.5">
                                <span className='mb-2'>Don't have an account? <Link className='text-blue-600' to='/sign-up'>Sign up</Link> </span>
                            </div>
                            <div className="input__form pt-2.5 flex items-center">
                                <hr className='w-full' />
                                <span className='mx-3 text-gray-500'>or</span>
                                <hr className='w-full' />
                            </div>
                            <div className="input__form pt-2.5">
                                <button className='flex items-center mx-auto gap-1.5 border px-6 py-2.5 rounded-full hover:shadow-lg duration-300' to='/sign-in'> <span><FcGoogle /></span> <span>Continue With Google</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;