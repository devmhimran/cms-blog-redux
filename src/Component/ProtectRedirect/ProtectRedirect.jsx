import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Pages/firebase.init";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


const ProtectRedirect = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    if(user && location.pathname === '/sign-in'){
        navigate(from, { replace: true });
    }
    return children
};

export default ProtectRedirect;