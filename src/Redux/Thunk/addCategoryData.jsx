import { addCategory } from "../actionCreators/categoryActionCreators";



const addCategoryData = (category) => {
    return async (dispatch, getState) => {
        const res = await fetch('http://localhost:5000/category-upload',{
            method: "POST",
            body: JSON.stringify(category),
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await res.json();

            dispatch(addCategory(category))
            console.log('category data', data)

        
    }
}

export default addCategoryData