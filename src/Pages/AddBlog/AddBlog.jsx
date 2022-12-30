import React, { useEffect } from 'react';
import SidebarHeading from '../../Component/SidebarHeading/SidebarHeading';
import { useDispatch, useSelector } from 'react-redux';
import CategoryTable from '../../Component/CategoryTable/CategoryTable';
import loadCategoryData from '../../Redux/Thunk/loadCategoryData';
import JoditEditor from 'jodit-react';
import { useState, useRef, useMemo } from 'react';

const AddBlog = () => {
    const dispatch = useDispatch();
    const editor = useRef(null);
    const [content, setContent] = useState('');


    const handleAddBlog = (e) => {
        e.preventDefault();

    }

    const { category } = useSelector(state => state.blog)
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
                    <div className="blog__title my-4">
                        <p className='text-xl font-semibold mb-2'>Keyword</p>
                        <input disabled className='border border-[#C7C9D1] px-4 py-1 w-full rounded-full outline-0' placeholder='Enter Keyword' type="text" name="blog__title" id="" />
                    </div>
                    
                </form>

                {/* <div dangerouslySetInnerHTML ={{ __html: content }} /> */}

            </div>
        </div>
    );
};

export default AddBlog;