import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Pages/firebase.init";
import useAdmin from "../useAdmin/useAdmin";
import Loading from "../Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";


const RequireAdmin = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoader] = useAdmin(user);
    const location = useLocation();
    if(loading || adminLoader){
        return <Loading></Loading>
    }
    
    if(!user || !admin){
        return <Navigate to='/dashboard/' state={{from: location}} replace></Navigate>
    }
    return children;
};

export default RequireAdmin;