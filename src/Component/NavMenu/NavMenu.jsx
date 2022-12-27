import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';

const NavMenu = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="nav__menu py-5 border-b">
            <div className='container max-w-screen-xl lg:mx-auto lg:px-0  px-3'>
                <div className="grid grid-cols-2 items-center">
                    <div className="logo">
                        <Link className='syne font-extrabold text-xl md:text-2xl lg:text-4xl' to='/'>Cms Blog</Link>
                    </div>
                    {/* navbar desktop */}
                    <div className={`navbar__desktop lg:block lg:static absolute lg:top-0 bg-white w-full left-0 lg:p-0 p-4 lg:border-0 border lg:duration-75 duration-500 ease-in 
                    ${open ? 'top-[8%]': 'top-[-550px]'}`}>
                        <ul className='inter block lg:flex items-center gap-6 justify-end'>
                            <li className='text-lg font-medium hover:text-[#2304FB] lg:my-0 my-2'><Link to='/'>Home</Link></li>
                            <li className='text-lg font-medium hover:text-[#2304FB] lg:my-0 my-2'><Link to='/about'>About</Link></li>
                            <li className='text-lg font-medium hover:text-[#2304FB] lg:my-0 my-2'><Link to='/contact'>Contact</Link></li>
                            <li className='lg:my-0 my-2'>
                                <div className='search__box'>
                                    <div class="relative block border border-[#C7C9D1] rounded-full">
                                        <span class="sr-only">Search</span>
                                        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                            <RiSearchLine className='h-3.5 w-3.5 fill-black' />
                                        </span>
                                        <input className='placeholder:text-black border border-0 pl-9 pr-3 rounded-full py-1 w-48 outline-0 text-base' placeholder="Search" type="text" name="search" />
                                    </div>
                                </div>
                            </li>
                            <li className='text-base font-medium lg:py-0 py-2'><Link className='bg-black text-white px-5 py-2 hover:bg-white hover:text-black border border-black rounded-full duration-300'>Sign In</Link></li>
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
                        {/* {
                            open ? <>
                                <div className={`navbar__phone__container absolute duration-500 ease-in ${open ? "top-[8%]" : "top-[-150px]"} left-0 w-full border bg-white p-5`}>
                                    <ul className='inter gap-6 justify-end'>
                                        <li className='text-lg font-medium hover:text-[#2304FB] my-3'><Link>Home</Link></li>
                                        <li className='text-lg font-medium hover:text-[#2304FB] my-3'><Link>About</Link></li>
                                        <li className='text-lg font-medium hover:text-[#2304FB] my-3'><Link>Contact</Link></li>
                                        <li className='my-3'>
                                            <div className='search__box'>
                                                <div class="relative block border border-[#C7C9D1] rounded-full">
                                                    <span class="sr-only">Search</span>
                                                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                                        <RiSearchLine className='h-3.5 w-3.5 fill-black' />
                                                    </span>
                                                    <input className='placeholder:text-black border-0 pl-9 pr-3 rounded-full py-1 border w-48 outline-0 text-base' placeholder="Search" type="text" name="search" />
                                                </div>
                                            </div>
                                        </li>
                                        <li className='text-base font-medium py-3 my-3'><Link className='bg-black text-white px-5 py-2 hover:bg-white hover:text-black border border-black rounded-full duration-300'>Sign In</Link></li>
                                    </ul>
                                </div>
                            </> : ''
                        } */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavMenu;