import { addToFavorite } from "../actionCreators/actionCreators"


const addFavoriteData = (data) => {
    console.log(data)
    return async (dispatch, getState) => {
        
        // const res = await fetch('http://localhost:5000/category-upload', {
        //     method: "POST",
        //     body: JSON.stringify(category),
        //     headers: {
        //         "Content-type": "application/json",
        //         "authorization": `Bearer ${localStorage.getItem('accessToken')}`
        //     }
        // })
        // const data = await res.json();
        dispatch(addToFavorite(data))
    }
}

export default addFavoriteData