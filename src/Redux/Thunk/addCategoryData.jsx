import toastify from "../../Component/Toastify/Toastify";
import { addCategory } from "../actionCreators/actionCreators";



const addCategoryData = (category) => {
    return async (dispatch, getState) => {
        const res = await fetch('https://cms-blog-redux-server.vercel.app/category-upload', {
            method: "POST",
            body: JSON.stringify(category),
            headers: {
                "Content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        const data = await res.json();


        if (data.acknowledged) {
            dispatch(addCategory({
                _id: data.insertedId,
                ...category
            }))
            toastify('success', 'Successfully Added')
        }

    }
}

export default addCategoryData