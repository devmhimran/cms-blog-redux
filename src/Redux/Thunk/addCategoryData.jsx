import toastify from "../../Component/Toastify/Toastify";
import { addCategory } from "../actionCreators/categoryActionCreators";



const addCategoryData = (category) => {
    return async (dispatch, getState) => {
        const res = await fetch('http://localhost:5000/category-upload', {
            method: "POST",
            body: JSON.stringify(category),
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await res.json();


        if (data.acknowledged) {
            dispatch(addCategory({
                _id: data.insertedId,
                ...category
            }))
            toastify('success', 'successfully added')
        }

    }
}

export default addCategoryData