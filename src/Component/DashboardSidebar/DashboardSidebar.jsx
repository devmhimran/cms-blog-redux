import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../Pages/firebase.init';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { emptyFavorite } from '../../Redux/actionCreators/actionCreators';

const DashboardSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [signInUser, setSignInUser] = useState({});
    const dispatch = useDispatch();
    const activeNav  = (nav) =>{
        const content = location.pathname
        if(content === nav){
            return content
        }
    }
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (user) {
            fetch(`https://cms-blog-redux-server.vercel.app/user/${user.uid}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => setSignInUser(data))
        }
    }, [signInUser && user])
    const handleSignOut = () =>{
        signOut(auth);
        localStorage.removeItem('accessToken');
        dispatch(emptyFavorite())
        // window.location.reload();
    }
  

    return (
        <div className='sidebar__main'>
            <div className="flex flex-col fixed z-10 h-full items-center w-56 overflow-hidden text-gray-400 bg-gray-900 inter">
                <a className="flex items-center w-full px-3 mt-3" href="/">
                    <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                    <span className="ml-2 text-sm font-bold">PostHub Dashboard</span>
                </a>
                <div className="w-full px-2">
                    <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                        <Link className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${activeNav('/dashboard') ? 'bg-gray-700 text-gray-300' : ''}`} to="/dashboard">
                            <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="ml-2 text-sm font-medium">Dashboard</span>
                        </Link>
                        <Link className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${activeNav('/dashboard/your-blog') ? 'bg-gray-700 text-gray-300' : ''}`} to="your-blog">
                            <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="ml-2 text-sm font-medium">Your Blog</span>
                        </Link>

                        <Link className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${activeNav('/dashboard/add-blog') ? 'bg-gray-700 text-gray-300' : ''}`} to="add-blog">
                            <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="ml-2 text-sm font-medium">Add Blog</span>
                        </Link>
                        <Link className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${activeNav('/dashboard/add-category') ? 'bg-gray-700 text-gray-300' : ''}`} to="add-category">
                            <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                            </svg>
                            <span className="ml-2 text-sm font-medium">Add Category</span>
                        </Link>
                    </div>

                </div>
                <span className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300 cursor-pointer" onClick={handleSignOut}>
                    <img className='w-7 h-7 rounded-full border object-cover' src={signInUser.profileImage} alt="" />
                    <span className="ml-2 text-sm font-medium">Logout</span>
                </span>
            </div>
        </div>
    );
};

export default DashboardSidebar;