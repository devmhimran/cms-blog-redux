import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Pages/firebase.init';
import { signOut } from 'firebase/auth';
import { BiBookmark } from 'react-icons/bi';
import postHubLogo from '../../assets/devmhimran-post-hub-logo.png'
import { useDispatch, useSelector } from 'react-redux';
import useSignInUserHook from '../SignInUserHook/useSignInUserHook';
import { useEffect } from 'react';
import Loading from '../Loading/Loading';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BiUser } from 'react-icons/bi';
import { emptyFavorite } from '../../Redux/actionCreators/actionCreators';
import SearchResult from '../SearchResult/SearchResult';

const NavMenu = () => {
    const [open, setOpen] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [user, loading] = useAuthState(auth);
    // const [signInUser] = useSignInUserHook()
    const { homeBlog } = useSelector(state => state.blog)
    const dispatch = useDispatch();
    const [signInUser, setSignInUser] = useState({});
    const [filteredSearch, setFilteredSearch] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/user/${user.uid}`, {
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

    const handleSignOut = () => {
        signOut(auth);
        dispatch(emptyFavorite())
        localStorage.removeItem('accessToken');
    }

    console.log(filteredSearch)

    const handleSearch = (e) => {
        e.preventDefault()
        const search = e.target.value;
        const newFilter = homeBlog.filter(data => {
            return data.blogTitle.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredSearch(newFilter)
            console.log(newFilter)
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div id='nav__menu' className="nav__menu py-5 border-b">
            <div className='container max-w-screen-xl lg:mx-auto lg:px-0  px-3'>
                <div className="grid grid-cols-2 items-center">
                    <div className="logo">
                        <Link className='syne font-extrabold text-xl md:text-2xl lg:text-4xl' to='/'>
                            <img className='w-56' src={postHubLogo} alt="" />
                        </Link>
                    </div>
                    {/* navbar desktop */}
                    <div className={`navbar__desktop lg:block lg:static absolute z-10 lg:top-0 bg-white w-full left-0 lg:p-0 p-4 lg:border-0 border lg:duration-75 duration-500 ease-in 
                    ${open ? 'top-[8%]' : 'top-[-550px]'}`}>
                        <ul className='inter block lg:flex items-center gap-6 justify-end'>
                            {/* <li className='text-lg font-medium hover:text-[#2304FB] lg:my-0 my-2'><Link to='/'>Home</Link></li>
                            <li className='text-lg font-medium hover:text-[#2304FB] lg:my-0 my-2'><Link to='/about'>About</Link></li>
                            <li className='text-lg font-medium hover:text-[#2304FB] lg:my-0 my-2'><Link to='/contact'>Contact</Link></li> */}
                            <li className='lg:my-0 my-2 w-8/12'>
                                <div className='search__box'>
                                    <div className="relative block border border-[#C7C9D1] rounded-full">
                                        <span className="sr-only">Search</span>
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                            <RiSearchLine className='h-3.5 w-3.5 fill-black' />
                                        </span>
                                        <input className='placeholder:text-black border border-0 pl-9 pr-3 rounded-full py-1 w-full outline-0 text-base' placeholder="Search" type="text" name="search" onChange={handleSearch} />
                                        {
                                            filteredSearch.length !== 0 && <>
                                                <div className='w-full absolute border rounded-xl p-3 top-[115%] h-[400px] overflow-hidden overflow-y-auto bg-gray-50'>
                                                    <SearchResult searchData={filteredSearch} />
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </li>
                            <li><Link to='/favorite'><BiBookmark className='text-2xl' /></Link></li>
                            {
                                user ?
                                    <>
                                        <li className='text-base font-medium lg:py-0 py-2 relative'>
                                            <div className="profile__img w-[46px] cursor-pointer rounded-full"
                                                onClick={() => setProfileDropdown(!profileDropdown)}
                                            >
                                                {
                                                    signInUser.profileImage ?
                                                        // <LazyLoadImage
                                                        //     src={signInUser.profileImage}

                                                        //     effect="blur"
                                                        //     className='w-10 h-10 object-cover rounded-full m-0.5 border hover:border-blue-600'
                                                        //     loading='eager'
                                                        // /> 
                                                        <img className='w-10 h-10 object-cover rounded-full m-0.5' src={signInUser.profileImage} alt="" />
                                                        :
                                                        <span className=''>
                                                            <BiUser className='text-2xl' />
                                                        </span>
                                                }


                                                {/* <img className='w-10 h-10 object-cover rounded-full m-0.5' src={signInUser.profileImage} alt="" /> */}
                                            </div>
                                            {
                                                profileDropdown ?
                                                    <>
                                                        <div className="profile__dropdown rounded-lg shadow absolute top-[55px] z-10 bg-white py-2 px-4">
                                                            <ul className='text-base syne'>
                                                                <li className='mb-2'>
                                                                    <Link to='/dashboard'>Dashboard</Link>
                                                                </li>
                                                                <li className='mb-2'>
                                                                    <Link to='#'>Setting</Link>
                                                                </li>
                                                                <hr />
                                                                <li className='mt-2 cursor-pointer' onClick={handleSignOut}>Logout</li>
                                                            </ul>
                                                        </div>
                                                    </> :
                                                    ''

                                            }

                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className='text-base font-medium lg:py-0 py-2'>
                                            <Link className='bg-black text-white px-5 py-2 hover:bg-white hover:text-black border border-black rounded-full duration-300' to='/sign-in'>Sign In</Link>
                                        </li>
                                    </>
                            }
                        </ul>
                    </div>
                    {/* navbar phone */}
                    <div className="navbar__phone lg:hidden md:block block ml-auto" >
                        <>
                            {
                                open ? <div className='border p-1.5' onClick={() => setOpen(!open)}><RxCross1 className='ml-auto w-5 h-5' /></div> :
                                    <div className='border p-1.5' onClick={() => setOpen(!open)}><RxHamburgerMenu className='ml-auto w-5 h-5' /></div>
                            }
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavMenu;