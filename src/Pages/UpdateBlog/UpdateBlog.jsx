import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import PageTitle from '../../Component/PageTitle/PageTitle';
import SidebarHeading from '../../Component/SidebarHeading/SidebarHeading';
import loadCategoryData from '../../Redux/Thunk/loadCategoryData';
import { TiDeleteOutline } from 'react-icons/ti';

const UpdateBlog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const editor = useRef(null);
    const [user] = useAuthState(auth)
    const [blog, setBlog] = useState([]);
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState('')
    // const [previousFeaturedImage, setPreviousFeaturedImage] = useState('');
    // setFeaturedImage(blog.featuredImage)
    const resetFeaturedImageFile = useRef();
    const imageApi = 'ef367f576eca302d4916e3889c6e0cc6';
    const date = new Date();
    const options = { month: "short", day: "numeric", year: "numeric" };

    useEffect(() => {
        dispatch(loadCategoryData())
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/blog/${id}`)
            .then(res => res.json())
            .then(data => setBlog(data))
    }, [id])

    const { category } = useSelector(state => state.blog)
    const btnClass = 'bg-black text-white hover:bg-white hover:text-black border border-black ';
    const btnDisable = 'bg-gray-300 text-gray-600'

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
        e.target.reset();
    }

    const handleFeaturedImagePreviewClear = () => {
        setFeaturedImage('')
        resetFeaturedImageFile.current.value = "";
    }

    const handleUpdateBlog = (e) => {

    }
    // setPreviousFeaturedImage(blog.featuredImage)
    // const handlePreviousFeaturedImage = () =>{
    //     setPreviousFeaturedImage('')
    // }
    console.log(blog.blogCategory)
    return (
        <div>
            <PageTitle title='Update Blog' />
            <SidebarHeading title='Update Blog' />
            <div className="add__post inter w-3/5">
                <form onSubmit={handleUpdateBlog}>
                    <div className="blog__title my-4">
                        <p className='text-xl font-semibold mb-2'>Blog Title</p>
                        <input className='border border-[#C7C9D1] px-4 py-1 w-full rounded-full outline-0' placeholder='Enter Blog Title' type="text" name="blogTitle" defaultValue={blog.blogTitle} />
                    </div>
                    <div className="blog__title my-4">
                        <p className='text-xl font-semibold mb-2'>Blog Description</p>
                        <JoditEditor
                            className='p-4'
                            ref={editor}
                            value={blog.content}
                            onChange={newContent => setContent(newContent)}
                            // defaultValue={blog.content}
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
                                    category.map(data => <option selected={ data.categoryName === blog.blogCategory ? true : false} key={data._id} defaultValue={data.categoryName}>{data.categoryName}</option>)
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
                                : <>
                                <div className="featured__image relative w-fit">
                                    <img className='w-64 mt-4' src={blog.featuredImage} alt="" />
                                    <span className='absolute top-[-5px] right-[-7px] cursor-pointer bg-white rounded-full' onClick={handleFeaturedImagePreviewClear}>
                                        {/* <TiDeleteOutline className='text-2xl text-gray-600' /> */}
                                    </span>
                                </div>
                            </>
                        }
                    </div>
                    <div className="blog__publish__btn my-3">
                        <button type='submit' className={`${btnClass}  rounded-full duration-300 mt-3 px-5 py-2`}>Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBlog;