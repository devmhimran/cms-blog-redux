import { async } from "@firebase/util"
import { userDataSignUp } from "../actionCreators/actionCreators"
import { useAuthState } from "react-firebase-hooks/auth"
import auth from "../../Pages/firebase.init"

const userAuthData = (user) =>{
    return async (dispatch, getState) =>{
        const res = await fetch(`https://cms-blog-redux-server.vercel.app/user/${user.uid}`,
        {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        const data = await res.json()
       await dispatch(userDataSignUp(data))
    }
}

export default userAuthData