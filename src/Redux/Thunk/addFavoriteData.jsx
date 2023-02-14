import { addToFavorite } from "../actionCreators/actionCreators"

const addFavoriteData = (id, favoriteData) => {

    return async (dispatch, getState) => {
        
        const res = await fetch(`http://localhost:5000/add-favorite?postId=${id}`, {
            method: "PUT",
            body: JSON.stringify(favoriteData),
            headers: {
                "Content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        const data = await res.json();

        dispatch(addToFavorite({
            _id: data.upsertedId,
            ...favoriteData
        }))

      
    }
}

export default addFavoriteData