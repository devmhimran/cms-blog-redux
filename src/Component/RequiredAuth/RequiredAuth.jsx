import React from 'react';
import auth from '../../Pages/firebase.init';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useDispatch } from 'react-redux';


const RequiredAuth = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    if (loading) {
        return <Loading></Loading>;
    }
    // console.log(<Navigate to='/sign-in' state={{ from: location }} replace></Navigate>)
    // console.log(<Navigate to='/' replace></Navigate>)
    if (!user) {
        return <Navigate to='/sign-in' state={{ from: location }} replace></Navigate>
    }

    if (!user.emailVerified) {
        return <div className='container mx-auto text-center h-[85vh] flex items-center justify-center'>
            <div className="card border border-dashed border-gray-400 mx-auto p-10">
                <div className="card-body">
                    <p>Your email is not verified</p>
                    <p>Please verify your email</p>
                    <button className='resendBtn mt-3 text-blue-400' onClick={async () => {
                        await sendEmailVerification();
                        toast.success('Sent Email');
                    }}>Resend</button>
                    <small className='block mt-4' disabled={true}>Note: If you not get this email, <br /> please check your spam box</small>
                </div>
            </div>
            {/* <Toaster position="top-center" reverseOrder={false} /> */}
        </div>;
    }
    return children;

};

export default RequiredAuth;