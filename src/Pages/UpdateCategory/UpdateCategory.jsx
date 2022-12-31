import React, { useEffect, useState } from 'react';
import SidebarHeading from '../../Component/SidebarHeading/SidebarHeading';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CATEGORY } from '../../Redux/actionTypes/actionTypes';
import CategoryTable from '../../Component/CategoryTable/CategoryTable';
import addCategoryData from '../../Redux/Thunk/addCategoryData';
import loadCategoryData from '../../Redux/Thunk/loadCategoryData';
import { useParams } from 'react-router-dom';
import updateCategoryData from '../../Redux/Thunk/updateCategoryData';
import toastify from '../../Component/Toastify/Toastify';


const UpdateCategory = () => {
    const { id } = useParams();
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    const { category } = useSelector(state => state.blog)

    useEffect(() => {
        fetch(`http://localhost:5000/category/${id}`)
            .then(res => res.json())
            .then(data => setData(data))
    }, [id])

    const handleCategory = (e) => {
        e.preventDefault();
        const categoryName = e.target.categoryName.value;
        const proceed = window.confirm('Are your sure?');
        const nameValidate = category.find(data => data.categoryName === categoryName)
        const categoryValue = {
            categoryName: categoryName,
        }
        console.log(nameValidate)

        if (proceed) {
            if (!nameValidate) {
                dispatch(updateCategoryData(id, categoryValue))
                e.target.reset()
            } else {
                toastify('error', 'Already Exists')
            }
        }

    }

    useEffect(() => {
        dispatch(loadCategoryData())
    }, [])

    console.log(category)
    return (
        <div>
            <SidebarHeading title='Update Category' />
            <div className="dashboard__container py-6 inter">
                <div className="flex gap-5 justify-between">
                    <form className='' onSubmit={handleCategory}>
                        <div className="category__input flex gap-3">
                            <div>
                                <input className='border border-[#C7C9D1] px-4 py-1 w-full rounded-full outline-0' placeholder='Category' defaultValue={data.categoryName} type="text" name="categoryName" required />
                            </div>
                            <div className="addBtn">
                                <button className='bg-black text-white px-5 py-2 hover:bg-white hover:text-black border border-black rounded-full duration-300'><span>Save Changes</span></button>
                            </div>
                        </div>
                    </form>
                    <div className="category__table w-6/12">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className='bg-black'>
                                    <th className='text-left text-white p-2'>#</th>
                                    <th className='text-left text-white p-2'>Category</th>
                                    <th className='text-left text-white p-2'>Status</th>
                                </tr>
                            </thead>
                            <tbody className='bg-[#f8f8f9]'>
                                {
                                    category.sort((a, b) => a._id - b._id).map((data, index) => <CategoryTable key={index} index={index} data={data} />)
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