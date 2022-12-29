import React, { useEffect } from 'react';
import SidebarHeading from '../../Component/SidebarHeading/SidebarHeading';
import { useDispatch, useSelector } from 'react-redux';
import CategoryTable from '../../Component/CategoryTable/CategoryTable';
import loadCategoryData from '../../Redux/Thunk/loadCategoryData';

const AddBlog = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(loadCategoryData())
    },[])
    const { category } = useSelector(state => state.blog)
    return (
        <div>
            <SidebarHeading title='Add Blog' />
            <tbody>

                {
                    category.map((data, index) => <CategoryTable key={index} index={index} data={data} />)
                }
            </tbody>
        </div>
    );
};

export default AddBlog;