import React, { useEffect, useState } from 'react';
import SidebarHeading from '../../Component/SidebarHeading/SidebarHeading';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CATEGORY } from '../../Redux/actionTypes/actionTypes';
import CategoryTable from '../../Component/CategoryTable/CategoryTable';
import addCategoryData from '../../Redux/Thunk/addCategoryData';
import loadCategoryData from '../../Redux/Thunk/loadCategoryData';
import { useParams } from 'react-router-dom';
import updateCategoryData from '../../Redux/Thunk/updateCategoryData';


const UpdateCategory = () => {
    const { id } = useParams();
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    useEffect(()=>{
        fetch(`http://localhost:5000/category/${id}`)
        .then(res => res.json())
        .then(data => setData(data))
    },[id])

    const handleCategory = (e) => {
        e.preventDefault();
        const categoryName = e.target.categoryName.value;
        const categoryValue = {
            categoryName: categoryName,
        }
        console.log(categoryValue)
        dispatch(updateCategoryData(id, categoryValue))
    }

    useEffect(() => {
        dispatch(loadCategoryData())
    }, [])

    const { category, singleCategory } = useSelector(state => state.blog)
    // console.log(singleCategory)
    return (
        <div>
            <h1>{id}</h1>
            <SidebarHeading title='Update Category' />
            <div className="dashboard__container p-6 inter">
                <div className="grid grid-cols-3 gap-6">
                    <form onSubmit={handleCategory}>
                        <div className="category__input flex gap-3">
                            <input className='border border-[#C7C9D1] px-4 py-1 w-full rounded-full outline-0' placeholder='Category' defaultValue={data.categoryName} type="text" name="categoryName" required />
                            <div className="addBtn">
                                <button className='bg-black text-white px-5 py-2 hover:bg-white hover:text-black border border-black rounded-full duration-300'>Update</button>
                            </div>
                        </div>
                    </form>
                    <div className="category__table col-span-2">
                        <table className="w-2/3 ml-auto table-auto">
                            <thead>
                                <tr className='bg-black'>
                                    <th className='text-left text-white p-2'>#</th>
                                    <th className='text-left text-white p-2'>Category</th>
                                    <th className='text-left text-white p-2'>Status</th>
                                </tr>
                            </thead>
                            <tbody className='bg-[#f8f8f9]'>
                                {
                                    category.sort((a,b) => a._id - b._id).map((data, index) => <CategoryTable key={index} index={index} data={data} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategory;