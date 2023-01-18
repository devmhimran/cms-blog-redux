import { deleteCategory } from "../actionCreators/actionCreators"


export const deleteCategoryData = (id) => {
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:5000/category-delete/${id}`, {
            method: "Delete",
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await res.json()
        if(data.acknowledged){
            dispatch(deleteCategory(id))
        }
    }
}