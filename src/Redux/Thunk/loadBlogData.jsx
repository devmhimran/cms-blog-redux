import { useSelector } from "react-redux"
import { fetchStart, loadBlog } from "../actionCreators/actionCreators"



const loadBlogData = () =>{
    // const { pageNum } = useSelector(state => state.blog)
    return async (dispatch, getState) =>{
        
        const {pageNum} = getState().blog
        
        const res = await fetch(`http://localhost:5000/blog?page=${pageNum}`)
        const data = await res.json()
        if(data.length) {
            dispatch(loadBlog(data))
        }
    }
}
export default loadBlogData