import { signOut } from "firebase/auth";
import toastify from "../../Component/Toastify/Toastify";
import { addBlog, emptyFavorite } from "../actionCreators/actionCreators";
import auth from "../../Pages/firebase.init";

const addBlogData = (blog) => {

    return async (dispatch, getState) => {
        const res = await fetch('https://cms-blog-redux-server.vercel.app/blog-upload', {
            method: "POST",
            body: JSON.stringify(blog),
            headers: {
                "Content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        const data = await res.json()
        if (res.status === 401 || res.status === 403) {
            dispatch(emptyFavorite())
            signOut(auth);
            localStorage.removeItem('accessToken');
        }
        if (data.acknowledged) {
            dispatch(addBlog({
                _id: data.insertedId,
                ...blog
            }))
            toastify('success', 'Successfully Added')
        }
    }

}

export default addBlogData
