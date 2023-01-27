import toastify from "../../Component/Toastify/Toastify";
import { addComment } from "../actionCreators/actionCreators";



const addCommentData = (commentData) => {
    return async (dispatch) => {
        const res = await fetch('http://localhost:5000/comment-upload', {
            method: "POST",
            body: JSON.stringify(commentData),
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await res.json();

        if (data.acknowledged) {
            dispatch(addComment({
                _id: data.insertedId,
                ...commentData
            }))
            toastify('success', 'successfully added')
        }
    }
};

export default addCommentData;