import { loadHomeBlog } from "../actionCreators/actionCreators";

const homeBlogData = () => {
    return async (dispatch) =>{
        
        const res = await fetch(`https://cms-blog-redux-server.vercel.app/homeBlog`)
        const data = await res.json()
        if(data.length) {
            dispatch(loadHomeBlog(data))
        }
    }
};

export default homeBlogData;