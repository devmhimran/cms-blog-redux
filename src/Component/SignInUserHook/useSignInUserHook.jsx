import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Pages/firebase.init";
import { signOut } from "firebase/auth";
import Loading from "../Loading/Loading";


const useSignInUserHook = () => {
    const [user, loading] = useAuthState(auth)
    const [signInUser, setSignInUser] = useState({});

    if(loading){
        return <Loading/>
    }
    useEffect(() => {
        if (user) {
            fetch(`https://cms-blog-redux-server.vercel.app/user/${user.uid}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                    }
                    return res.json()
                })
                .then(data => setSignInUser(data))
        }
    }, [user])

    return [signInUser]
}

export default useSignInUserHook