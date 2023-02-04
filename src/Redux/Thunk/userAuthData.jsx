import { async } from "@firebase/util"
import { userDataSignUp } from "../actionCreators/actionCreators"
import { useAuthState } from "react-firebase-hooks/auth"
import auth from "../../Pages/firebase.init"


const userAuthData = () =>{

    const [user] = useAuthState(auth)
    // console.log(user.uid)
    return async (dispatch, getState) =>{
        const res = await fetch(`http://localhost:5000/user/${user.uid}`)
        const data = await res.json()
        console.log(data)
       await dispatch(userDataSignUp(data))
    }
}

export default userAuthData