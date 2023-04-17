import { useSelector } from "react-redux"
import { emptyFavorite, fetchStart, loadBlog } from "../actionCreators/actionCreators"
import { signOut } from "firebase/auth"
import auth from "../../Pages/firebase.init"

const loadBlogData = () => {
    return async (dispatch, getState) => {
        const { pageNum } = getState().blog
        const res = await fetch(`https://cms-blog-redux-server.vercel.app/blog?page=${pageNum}`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        const data = await res.json()
        if (res.status === 401 || res.status === 403) {
            dispatch(emptyFavorite())
            signOut(auth);
            localStorage.removeItem('accessToken');
        }
        if (data.length) {
            dispatch(loadBlog(data))
        }
    }
}
export default loadBlogData