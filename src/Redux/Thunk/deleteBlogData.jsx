import { deleteBlog } from "../actionCreators/actionCreators"


const deleteBlogData = (id) => {
    return async (dispatch, getState) => {
        const res = await fetch(`https://cms-blog-redux-server.vercel.app/blog-delete/${id}`, {
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