import React, { useEffect } from 'react';
import SidebarHeading from '../../Component/SidebarHeading/SidebarHeading';
import { useDispatch, useSelector } from 'react-redux';
import CategoryTable from '../../Component/CategoryTable/CategoryTable';
import loadCategoryData from '../../Redux/Thunk/loadCategoryData';
import JoditEditor from 'jodit-react';
import { useState, useRef, useMemo } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

const AddBlog = () => {
    const dispatch = useDispatch();
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [badge, setBadge] = useState('')
    const resetBadgeFile = useRef();
    const imageApi = 'ef367f576eca302d4916e3889c6e0cc6';

    useEffect(() => {
        dispatch(loadCategoryData())
    }, [])
    const handleAddBlog = (e) => {
        e.preventDefault();
    }

    const handleBadge = (e) => {
        const photoURL = e.target.files[0];
        const formData = new FormData();
        formData.append('image', photoURL);
        console.log(photoURL)
        const imgUrl = `https://api.imgbb.com/1/upload?key=${imageApi}`;
        fetch(imgUrl, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then((result) => {
                const badge = result.data.image.url;
                setBadge(badge);
                // console.log(logo)
            })

    }
    const handleBadgePreviewClear = () => {
        setBadge('')
        resetBadgeFile.current.value = "";
    }

    const { category } = useSelector(state => state.blog)

    const handleCategorySelect = (value) => {
        console.log(value)
    }

    return (
        <div>
            <SidebarHeading title='Add Blog' />
            <div className="add__post inter w-3/5">
                <form onSubmit={handleAddBlog}>
                    <div className="blog__title my-4">
                        <p className='text-xl font-semibold mb-2'>Blog Title</p>
                        <input className='border border-[#C7C9D1] px-4 py-1 w-full rounded-full outline-0' placeholder='Enter Blog Title' type="text" name="blog__title" id="" />
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
                            <input disabled className='border border-[#C7C9D1] px-4 py-1 w-full rounded-full outline-0' placeholder='Enter Keyword' type="text" name="blog__title" id="" />
                        </div>
                        <div className="blog__category w-full my-4">
                        <p className='text-xl font-semibold mb-2'>Select Category</p>
                            <select className='py-1.5 w-full border border-[#C7C9D1] rounded-full outline-0' name="category" onChange={(e) => handleCategorySelect(e.target.value)} required>
                                {
                                    category.map(data => <option key={data._id} value={data.categoryName}>{data.categoryName}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className='blog__featured__image my-3'>
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input type="file" className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-grey-50 file:text-grey-700
                            hover:file:bg-blue-100
                            "
                                onChange={handleBadge}
                                name='badge'
                                ref={resetBadgeFile}
                            />
                        </label>
                        {
                            badge ?
                                <>
                                    <div className="preview__logo relative w-fit">
                                        <img className='w-64 mt-4' src={badge} alt="" />
                                        <span className='absolute top-[-5px] right-[-7px] cursor-pointer bg-white rounded-full' onClick={handleBadgePreviewClear}>
                                            <TiDeleteOutline className='text-2xl text-gray-600' />
                                        </span>
                                    </div>
                                </>
                                : ''
                        }
                    </div>

                </form>

                {/* <div dangerouslySetInnerHTML ={{ __html: content }} /> */}

            </div>
        </div>
    );
};

export default AddBlog;