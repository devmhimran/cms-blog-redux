import React, { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { TiDeleteOutline } from 'react-icons/ti';

const SignUp = () => {
    const [profileImage, setProfileImage] = useState('')
    const resetProfileImageFile = useRef();
    const imageApi = 'ef367f576eca302d4916e3889c6e0cc6';
    const handleProfileImage = (e) => {
        const photoURL = e.target.files[0];
        const formData = new FormData();
        formData.append('image', photoURL);
        const imgUrl = `https://api.imgbb.com/1/upload?key=${imageApi}`;
        fetch(imgUrl, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then((result) => {
                const profileImage = result.data.image.url;
                setProfileImage(profileImage);
                // console.log(logo)
            })

    }
    const handleProfileImagePreviewClear = () => {
        setprofileImage('')
        resetProfileImageFile.current.value = "";
    }

    return (
        <div className='container mx-auto h-[90vh] flex justify-center items-center'>
            <div className="signup__form">
                <div className="card border w-96 p-6 syne rounded-xl">
                    <div className="card-body">
                        <form>
                            <h2 className='text-xl font-bold mb-4'>Sign In</h2>
                            <div className="input__form py-2">
                                <label htmlFor="name" className='text-gray-800 font-semibold'>Enter your name</label>
                                <input className='placeholder:text-black  border border-[#C7C9D1] px-3 rounded-full py-1 w-full outline-0 text-base' type="text" name="name" id="name" required />
                            </div>
                            <div className="input__form py-2">
                                <label htmlFor="email" className='text-gray-800 font-semibold'>Enter your email</label>
                                <input className='placeholder:text-black  border border-[#C7C9D1] px-3 rounded-full py-1 w-full outline-0 text-base' type="email" name="email" id="email" required />
                            </div>
                            <div className="input__form py-2">
                                <label htmlFor="password" className='text-gray-800 font-semibold'>Password</label>
                                <input className='placeholder:text-black  border border-[#C7C9D1] px-3 rounded-full py-1 w-full outline-0 text-base' type="password" name="password" id="password" required />
                            </div>
                            <div className="input__form py-2">
                                <label htmlFor="confirmPassword" className='text-gray-800 font-semibold'>Confirm Password</label>
                                <input className='placeholder:text-black  border border-[#C7C9D1] px-3 rounded-full py-1 w-full outline-0 text-base' type="password" name="confirmPassword" id="confirmPassword" required />
                            </div>
                            <div className='blog__featured__image my-3'>
                                <label className="block w-full border rounded-full">
                                    <span className="sr-only">Choose Featured Image</span>
                                    <input type="file" className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-grey-50 file:text-grey-700
                            hover:file:bg-blue-100
                            "
                                        onChange={handleProfileImage}
                                        name='profileImage'
                                        ref={resetProfileImageFile}
                                    />
                                </label>
                                {
                                    profileImage ?
                                        <>
                                            <div className="featured__image relative w-48">
                                                <img className='w-64 mt-4' src={profileImage} alt="" />
                                                <span className='absolute top-[-5px] right-[-7px] cursor-pointer bg-white rounded-full' onClick={handleProfileImagePreviewClear}>
                                                    <TiDeleteOutline className='text-2xl text-gray-600' />
                                                </span>
                                            </div>
                                        </>
                                        : ''
                                }
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

export default SignUp;