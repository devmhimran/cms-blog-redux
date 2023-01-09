import React, { useEffect } from 'react';
import SidebarHeading from '../../Component/SidebarHeading/SidebarHeading';
import { useDispatch, useSelector } from 'react-redux';
import CategoryTable from '../../Component/CategoryTable/CategoryTable';
import loadCategoryData from '../../Redux/Thunk/loadCategoryData';
import JoditEditor from 'jodit-react';
import { useState, useRef, useMemo } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import PageTitle from '../../Component/PageTitle/PageTitle';
import addCategoryData from '../../Redux/Thunk/addCategoryData';
import addBlogData from '../../Redux/Thunk/addBlogData';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const AddBlog = () => {
    const dispatch = useDispatch();
    const editor = useRef(null);
    const [user] = useAuthState(auth)
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState('')
    const resetFeaturedImageFile = useRef();
    const imageApi = 'ef367f576eca302d4916e3889c6e0cc6';
    const date = new Date();
    const options = { month: "short", day: "numeric", year: "numeric" };
    useEffect(() => {
        dispatch(loadCategoryData())
    }, [])

    const handleAddBlog = (e) => {
        e.preventDefault();
        const blogTitle = e.target.blogTitle.value;
        const blogKeyword = e.target.blogKeyword.value;
        const blogCategory = e.target.blogCategory.value;
        const blogContent = {
            userId: user.uid,
            blogTitle,
            content,
            blogKeyword,
            blogCategory,
            featuredImage,
            date: new Intl.DateTimeFormat("en-US", options).format(date)
        }
        dispatch(addBlogData(blogContent))
    }

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

    const { category } = useSelector(state => state.blog)


    return (
        <div>
            <PageTitle title='Add Blog' />
            <SidebarHeading title='Add Blog' />
            <div className="add__post inter w-3/5">
                <form onSubmit={handleAddBlog}>
                    <div className="blog__title my-4">
                        <p className='text-xl font-semibold mb-2'>Blog Title</p>
                        <input className='border border-[#C7C9D1] px-4 py-1 w-full rounded-full outline-0' placeholder='Enter Blog Title' type="text" name="blogTitle" id="" />
                    </div>
                    <div className="blog__title my-4">
                        <p className='text-xl font-semibold mb-2'>Blog Description</p>
                        <JoditEditor
                            className='p-4'
                            ref={editor}
                            value={content}
                            onChange={newContent => setContent(newContent)}
                        />
                    </div>
                    <div className='flex gap-3 items-center'>
                        <div className="blog__keyword w-full my-4">
                            <p className='text-xl font-semibold mb-2'>Keyword</p>
                            <input disabled className='border border-[#C7C9D1] px-4 py-1 w-full rounded-full outline-0' placeholder='Enter Keyword' type="text" name="blogKeyword" id="" />
                        </div>
                        <div className="blog__category w-full my-4">
                            <p className='text-xl font-semibold mb-2'>Select Category</p>
                            <select className='py-1.5 w-full border border-[#C7C9D1] rounded-full outline-0' name="blogCategory" required>
                                {
                                    category.map(data => <option key={data._id} value={data.categoryName}>{data.categoryName}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className='blog__featured__image my-3'>
                        <label className="block w-96 border rounded-full">
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
                    <div className="blog__publish__btn my-3">
                        <button type='submit' className='bg-black text-white mt-3 px-5 py-2 hover:bg-white hover:text-black border border-black rounded-full duration-300'>Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;