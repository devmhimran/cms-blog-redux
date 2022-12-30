import toastify from "../../Component/Toastify/Toastify";
import { updateCategory } from "../actionCreators/categoryActionCreators";


const updateCategoryData = (id, category) => {
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:5000/category/${id}`, {
            method: "PUT",
            body: JSON.stringify(category),
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await res.json();
        console.log()
        if (data.acknowledged) {
            dispatch(updateCategory(
                {
                    _id: id,
                    ...category
                }))
            window.location.reload();
            toastify('success', 'successfully added')
        }
    }
}

export default updateCategoryData