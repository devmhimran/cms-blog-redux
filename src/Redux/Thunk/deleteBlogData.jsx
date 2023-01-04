import { deleteBlog } from "../actionCreators/categoryActionCreators"


const deleteBlogData = (id) => {
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:5000/blog-delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await res.json()
        if (data.acknowledged) {
            dispatch(deleteBlog(id))
        }
    }
}

export default deleteBlogData