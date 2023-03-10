import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Pages/firebase.init';
import { signOut } from 'firebase/auth';
import { BiBookmark } from 'react-icons/bi';
import postHubLogo from '../../assets/devmhimran-post-hub-logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loading from '../Loading/Loading';
import { BiUser } from 'react-icons/bi';
import { emptyFavorite } from '../../Redux/actionCreators/actionCreators';


const NavMenu = () => {
    const [open, setOpen] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [user, loading] = useAuthState(auth);
    const { homeBlog } = useSelector(state => state.blog)
    const dispatch = useDispatch();
    const [signInUser, setSignInUser] = useState({});
    const [filteredSearch, setFilteredSearch] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);

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

    const handleSignOut = () => {
        signOut(auth);
        dispatch(emptyFavorite())
        localStorage.removeItem('accessToken');
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const search = e.target.value;
        if (search === '') {
            setFilteredSearch([])
        } else {
            const newFilter = homeBlog.filter(data => {
                return data.blogTitle.toLowerCase().includes(search.toLowerCase())
            })
            setFilteredSearch(newFilter)
        }
    }

    const searchRef = useRef();
    const navbarDropDown = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (searchRef.current.contains(e.target)) {
                setSearchOpen(true)
            } else {
                setSearchOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }

    })

    useEffect(() => {
        let dropdownHandler = (e) => {
            if (!navbarDropDown.current.contains(e.target)) {
                setProfileDropdown(false)
            }
        }
        document.addEventListener('mousedown', dropdownHandler)
        return () => {
            document.removeEventListener('mousedown', dropdownHandler)
        }

    })

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
                            <li className='lg:my-0 my-2 w-full lg:w-8/12'>
                                <div className='search__box'>
                                    <div ref={searchRef} className="relative block border border-[#C7C9D1] rounded-full">
                                        <span className="sr-only">Search</span>
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                            <RiSearchLine className='h-3.5 w-3.5 fill-black' />
                                        </span>
                                        <input className='placeholder:text-black border border-0 pl-9 pr-3 rounded-full py-1 w-full outline-0 text-base' placeholder="Search" type="text" name="search" onChange={handleSearch} autoComplete="off" />
                                        {
                                            searchOpen ? <>
                                                <div className='w-full absolute border rounded-xl top-[115%] h-auto overflow-hidden overflow-y-auto bg-gray-50'>
                                                    <div>
                                                        {
                                                            filteredSearch.slice(0, 6).map((data, index) =>
                                                                <div key={index}>
                                                                    <Link to={`/blog/${data._id}`}>
                                                                        <div key={data._id} className='flex items-center gap-3 m-4'>
                                                                            <img className='w-14 h-14 object-cover rounded-xl' src={data.featuredImage} alt="" />
                                                                            <p className='text-base hover:underline hover:text-blue-500'>{data.blogTitle}</p>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </> : ''
                                        }
                                    </div>
                                </div>
                            </li>
                            <li className='w-7 lg:w-auto'><Link className='' to='/favorite'><BiBookmark className='text-2xl' /></Link></li>
                            {
                                user ?
                                    <>
                                        <li className='text-base font-medium lg:py-0 py-2 relative' ref={navbarDropDown}>
                                            <div className="profile__img w-[46px] cursor-pointer rounded-full"
                                                onClick={() => setProfileDropdown(!profileDropdown)}
                                            >
                                                {
                                                    signInUser.profileImage ?
                                                        <img className='w-10 h-10 object-cover rounded-full m-0.5' src={signInUser.profileImage} alt="" />
                                                        :
                                                        <span className=''>
                                                            <BiUser className='text-2xl' />
                                                        </span>
                                                }
                                            </div>
                                            {
                                                profileDropdown ?
                                                    <>
                                                        <div className="profile__dropdown rounded-lg shadow absolute top-[55px] right-0 z-10 bg-white py-2 px-4">
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