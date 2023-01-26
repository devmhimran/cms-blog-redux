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
import toastify from '../../Component/Toastify/Toastify';
import { toggleFeaturedBlog } from '../../Redux/actionCreators/actionCreators';

const UpdateBlog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const editor = useRef(null);
    const [user] = useAuthState(auth)
    const [blog, setBlog] = useState([]);
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState('')
    const resetFeaturedImageFile = useRef();
    const imageApi = 'ef367f576eca302d4916e3889c6e0cc6';
    const date = new Date();
    const options = { month: "short", day: "numeric", year: "numeric" };

    const [featuredBlog, setFeaturedBlog] = useState(false)

    // setFeaturedBlog(blog.featuredBlog)
    useEffect(() => {
        dispatch(loadCategoryData())

    }, [id])

    useEffect(() => {

        fetch(`http://localhost:5000/blog/${id}`)
            .then(res => res.json())
            .then(data => setBlog(data))

    }, [])

    useEffect(() => {
        dispatch(toggleFeaturedBlog(blog.featuredBlog))
    }, [blog])


    const selected = useSelector(state => state.featuredBlogReducer.featuredBlog)
    // console.log(blog.featuredBlog)
    const { category } = useSelector(state => state.blog)
    const btnClass = 'bg-black text-white hover:bg-white hover:text-black border border-black ';
    const btnDisable = 'bg-gray-300 text-gray-600'


    console.log(selected)
    const handleFeaturedBlog = () => {
        dispatch(toggleFeaturedBlog(!selected))
        // option = !selected.featuredBlog
        // console.log(!selected)
        // selected = { ...blog,
        //     featuredBlog: !selected.featuredBlog
        // };
        // setFeaturedBlog(!featuredBlog)
        // if(selected.featuredBlog){
        //     selected.featuredBlog = false
        // }else{
        //     selected.featuredBlog = true
        // }
        // setFeaturedBlog(!featuredBlog)

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

    const handleUpdateBlog = (e) => {
        e.preventDefault();
        const blogTitle = e.target.blogTitle.value;
        const blogKeyword = e.target.blogKeyword.value;
        const blogCategory = e.target.blogCategory.value;
        let blogImage;
        if (featuredImage) {
            blogImage = featuredImage
        } else {
            blogImage = blog.featuredImage
        }
        const blogContent = {
            userId: user.uid,
            blogTitle,
            content,
            blogKeyword,
            blogCategory,
            blogImage,
            featuredBlog: selected,
            date: new Intl.DateTimeFormat("en-US", options).format(date)
        }

        fetch(`http://localhost:5000/update-blog/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(blogContent),
        })
            .then(res => res.json())
        toastify('success', 'Successfully Update')

    }



    return (
        <div>
            <PageTitle title={`${blog.blogTitle} Edit Blog`} />
            <SidebarHeading title='Edit Blog' />
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
                                    category.map(data =>
                                        <option selected={data.categoryName === blog.blogCategory ? 'selected' : ''} key={data._id} value={data.categoryName}>{data.categoryName}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>

                    <div className="featured__blog py-6">
                        <p className="text-xl font-semibold mb-2">Select As Featured Blog</p>
                        <div className="inline-flex items-center border rounded-3xl">
                            <div className="relative inline-block h-4 w-8 cursor-pointer rounded-full">
                                <input
                                    id="switch-component"
                                    type="checkbox"
                                    className="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full bg-blue-gray-100 transition-colors duration-300 checked:bg-pink-500 peer-checked:border-pink-500 peer-checked:before:bg-pink-500"
                                    name='featuredCheckbox'
                                    checked={selected}
                                    onChange={handleFeaturedBlog}
                                />
                                <label
                                    htmlFor="switch-component"
                                    className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-pink-500 peer-checked:before:bg-pink-500"
                                >
                                    <div
                                        className="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
                                        data-ripple-dark="true"
                                    ></div>
                                </label>
                            </div>
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