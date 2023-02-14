import { deleteCategory } from "../actionCreators/actionCreators"


export const deleteCategoryData = (id) => {
    return async (dispatch, getState) => {
        const res = await fetch(`https://cms-blog-redux-server.vercel.app/category-delete/${id}`, {
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