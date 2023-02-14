import { loadFavorite } from "../actionCreators/actionCreators"

const loadFavoriteData = (email) => {
    return async (dispatch, getState) => {
        if (email) {
            const res = await fetch(`https://cms-blog-redux-server.vercel.app/favorite-data?email=${email}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            if(data.length){
                dispatch(loadFavorite(data))
            }
        }
    }
}

export default loadFavoriteData;