import toastify from "../../Component/Toastify/Toastify";
import { updateCategory } from "../actionCreators/actionCreators";


const updateCategoryData = (id, category) => {
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:5000/category/${id}`, {
            method: "PUT",
            body: JSON.stringify(category),
            headers: {
                "Content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        const data = await res.json();
        if (data.acknowledged) {
            dispatch(updateCategory(
                {
                    _id: id,
                    ...category
                }))
            window.location.reload();
            toastify('success', 'Successfully Updated')
        }
    }
}

export default updateCategoryData