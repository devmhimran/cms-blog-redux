import React, { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TiDeleteOutline } from 'react-icons/ti';
import { useForm } from 'react-hook-form';
import auth from '../firebase.init';
import { useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';

const SignUp = () => {
    const [profileImage, setProfileImage] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const resetProfileImageFile = useRef();
    const resetFeaturedImageFile = useRef();
    const [featuredImage, setFeaturedImage] = useState('')
    const imageApi = 'ef367f576eca302d4916e3889c6e0cc6';
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification, sending, emailError] = useSendEmailVerification(auth);
    const [updateProfile, updating, userUpdateError] = useUpdateProfile(auth);

    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/dashboard";

    const handleFeaturedImage = (e) => {
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
                const featuredImage = result.data.image.url;
                setFeaturedImage(featuredImage);
            })

    }
    const handleFeaturedImagePreviewClear = () => {
        setFeaturedImage('')
        resetFeaturedImageFile.current.value = "";
    }

    const onSubmit = async (data) => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const confirmPassword = data.confirmPassword;

        if (password !== confirmPassword) {
            setPasswordError("Password doesn't match")
        } else {
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });
            await updateProfile({ photoURL: featuredImage });
            await sendEmailVerification();
        }


        const signUpForm = {
            name,
            email,
            password,
            confirmPassword,
            profileImage
        }
    }
    
    if(user){
        navigate(from, {replace:true});
    }

    return (
        <div className='container mx-auto h-[90vh] flex justify-center items-center my-4'>
            <div className="signup__form">
                <div className="card border w-96 p-6 syne rounded-xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2 className='text-xl font-bold mb-4'>Sign In</h2>
                            <div className="input__form py-2">
                                <label htmlFor="name" className='text-gray-800 font-semibold'>Enter your name</label>
                                <input className='placeholder:text-black  border border-[#C7C9D1] px-3 rounded-full py-1 w-full outline-0 text-base' type="text" name="name" id="name"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Name Required"
                                        },
                                        pattern: {
                                            value: /^[A-Za-z]+$/i,
                                            message: "Enter valid name"
                                        }

                                    })}
                                />
                                <div className="error__msg inter">
                                    {errors.name?.type === 'required' && <span className='text-sm text-red-500 mt-2'>{errors.name.message}</span>}
                                    {errors.name?.type === 'pattern' && <span className='text-sm text-red-500 mt-2'>{errors.name.message}</span>}
                                </div>
                            </div>
                            <div className="input__form py-2">
                                <label htmlFor="email" className='text-gray-800 font-semibold'>Enter your email</label>
                                <input className='placeholder:text-black  border border-[#C7C9D1] px-3 rounded-full py-1 w-full outline-0 text-base' type="email" name="email" id="email"
                                    {
                                    ...register("email",
                                        {
                                            required: {
                                                value: true,
                                                message: "Email Required"
                                            },
                                            pattern: {
                                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                message: "Enter valid email"
                                            }
                                        })}
                                />
                                <div className="error__msg inter">
                                    {errors.email?.type === 'required' && <span className='text-sm text-red-500 mt-2'>{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className='text-sm text-red-500 mt-2'>{errors.email.message}</span>}
                                </div>
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
                                onChange={handleFeaturedImage}
                                name='featuredImage'
                                ref={resetFeaturedImageFile}
                            />
                        </label>
                        {
                            featuredImage ?
                                <>
                                    <div className="featured__image relative w-fit">
                                        <img className='w-64 mt-4' src={featuredImage} alt="" />
                                        <span className='absolute top-[-5px] right-[-7px] cursor-pointer bg-white rounded-full' onClick={handleFeaturedImagePreviewClear}>
                                            <TiDeleteOutline className='text-2xl text-gray-600' />
                                        </span>
                                    </div>
                                </>
                                : ''
                        }
                    </div>
                            <div className="input__form py-2">
                                <label htmlFor="password" className='text-gray-800 font-semibold'>Password</label>
                                <input className='placeholder:text-black  border border-[#C7C9D1] px-3 rounded-full py-1 w-full outline-0 text-base' type="password" name="password" id="password"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters' // JS only: <p>error message</p> TS only support string
                                        }

                                    })}
                                />
                                <div className="error__msg inter">
                                    {errors.password?.type === 'required' && <span className='text-sm text-red-500 mt-2'>{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className='text-sm text-red-500 mt-2'>{errors.password.message}</span>}
                                </div>
                            </div>
                            <div className="input__form py-2">
                                <label htmlFor="confirmPassword" className='text-gray-800 font-semibold'>Confirm Password</label>
                                <input className='placeholder:text-black  border border-[#C7C9D1] px-3 rounded-full py-1 w-full outline-0 text-base' type="password" name="confirmPassword" id="confirmPassword"
                                    {...register("confirmPassword", {
                                        required: {
                                            value: true,
                                            message: 'Confirm password required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters' // JS only: <p>error message</p> TS only support string
                                        }

                                    })}
                                />
                                <div className="error__msg inter">
                                    {errors.confirmPassword?.type === 'required' && <span className='text-sm text-red-500 mt-2'>{errors.confirmPassword.message}</span>}
                                    {errors.confirmPassword?.type === 'minLength' && <span className='text-sm text-red-500 mt-2'>{errors.confirmPassword.message}</span>}
                                    {errors.confirmPassword ? '' : <span className={`text-sm text-red-500 mt-2`}>{passwordError}</span>}
                                </div>
                            </div>
                            <div className="input__form py-2.5">
                                <button className='bg-black text-white px-5 py-2 hover:bg-white hover:text-black border border-black rounded-full duration-300' to='/sign-in'>Sign Up</button>
                            </div>

                            <div className="input__form pt-2.5">
                                <span className='mb-2'>Already have account? <Link className='text-blue-600' to='/sign-in'>Sign in</Link> </span>
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