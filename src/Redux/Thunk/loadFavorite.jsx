import { signOut } from "firebase/auth"
import auth from "../../Pages/firebase.init"
import { emptyFavorite, loadFavorite } from "../actionCreators/actionCreators"

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
            if (res.status === 401 || res.status === 403) {
                signOut(auth);
                dispatch(emptyFavorite())
                localStorage.removeItem('accessToken');
            }
            if(data.length){
                dispatch(loadFavorite(data))
            }
        }
    }
}

export default loadFavoriteData;