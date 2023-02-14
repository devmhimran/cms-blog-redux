import { removeToFavorite } from "../actionCreators/actionCreators"

const removeFavoriteData = (id) => {
    return async (dispatch, getState) =>{
        const res = await fetch(`http://localhost:5000/delete-favorite/${id}`,{
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        const data = await res.json()
        if(data.acknowledged){
            dispatch(removeToFavorite(id))
        }
    }
}

export default removeFavoriteData