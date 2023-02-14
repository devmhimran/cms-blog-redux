import { loadFavorite } from "../actionCreators/actionCreators"


const loadFavoriteData = (email) => {
    return async (dispatch, getState) => {
        if (email) {
            const res = await fetch(`http://localhost:5000/favorite-data?email=${email}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            if(data.length){
                dispatch(loadFavorite(data))
            }
            // console.log(email)
            console.log(data)
        }
    }
}

export default loadFavoriteData;