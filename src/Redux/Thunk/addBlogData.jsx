import toastify from "../../Component/Toastify/Toastify";
import { addBlog } from "../actionCreators/actionCreators";


const addBlogData = (blog) => {

    return async (dispatch, getState) => {
        const res = await fetch('http://localhost:5000/blog-upload', {
            method: "POST",
            body: JSON.stringify(blog),
            headers: {
                "Content-type": "application/json"
            }
        });
        const data = await res.json()

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
