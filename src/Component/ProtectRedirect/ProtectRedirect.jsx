import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Pages/firebase.init";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


const ProtectRedirect = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    const navigate = useNavigate();

    if (user) {
        if (location.pathname === '/sign-in' || location.pathname === '/sign-up') {
            window.history.back()
            // return <Navigate to='/sign-in' state={{ from: location }} replace></Navigate>
        }
       
    }
    // if (!user) {
    //     return <Navigate to='/sign-in' state={{ from: location }} replace></Navigate>
    // }

    return children
};

export default ProtectRedirect;