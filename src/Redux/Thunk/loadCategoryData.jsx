import { loadCategory } from "../actionCreators/actionCreators"

const loadCategoryData = () =>{
    return async(dispatch, getState) =>{
        const res = await fetch('http://localhost:5000/category')
        const data = await res.json()
        if(data.length){
            dispatch(loadCategory(data))
        }
    }
}

export default loadCategoryData;