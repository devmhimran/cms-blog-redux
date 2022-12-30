import React, { useEffect } from 'react';
import SidebarHeading from '../../Component/SidebarHeading/SidebarHeading';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CATEGORY } from '../../Redux/actionTypes/actionTypes';

import CategoryTable from '../../Component/CategoryTable/CategoryTable';
import addCategoryData from '../../Redux/Thunk/addCategoryData';
import loadCategoryData from '../../Redux/Thunk/loadCategoryData';
import { ToastContainer, toast } from 'react-toastify';

const AddCategory = () => {
    const dispatch = useDispatch();
    const notify = () => toast.success("Category Added Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const handleCategory = (e) => {
        e.preventDefault();
        const categoryName = e.target.categoryName.value;
        const categoryValue = {
            categoryName: categoryName,
        }
        // notify()
        dispatch(addCategoryData(categoryValue))
        e.target.reset()
    }

    useEffect(() => {
        dispatch(loadCategoryData())
    }, [])

    const { category } = useSelector(state => state.blog)
    console.log(category)
    return (
        <div>
            <SidebarHeading title='Add Category' />
            <div className="dashboard__container p-6 inter">
                <div className="grid grid-cols-3 gap-6">
                    <form onSubmit={handleCategory}>
                        <div className="category__input flex gap-3">
                            <input className='border border-[#C7C9D1] px-4 py-1 w-full rounded-full outline-0' placeholder='Category' type="text" name="categoryName" required />
                            <div className="addBtn">
                                <button className='bg-black text-white px-5 py-2 hover:bg-white hover:text-black border border-black rounded-full duration-300'>Add</button>
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
                                    category.map((data, index) => <CategoryTable key={index} index={index} data={data} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default AddCategory;