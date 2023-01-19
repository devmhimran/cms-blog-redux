import { loadHomeBlog } from "../actionCreators/actionCreators";

const homeBlogData = () => {
    return async (dispatch) =>{
        
        const res = await fetch(`http://localhost:5000/homeBlog`)
        const data = await res.json()
        if(data.length) {
            dispatch(loadHomeBlog(data))
        }
    }
};

export default homeBlogData;