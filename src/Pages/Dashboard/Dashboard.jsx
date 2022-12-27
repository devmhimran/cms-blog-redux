import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardSidebar from '../../Component/DashboardSidebar/DashboardSidebar';

const Dashboard = () => {
    const location = useLocation();
    console.log(location.pathname)
    if (location.pathname.includes('dashboard')) {

    }

    useEffect(() => {
        if (location.pathname.includes('dashboard')) {
            const nav = document.getElementById('nav__menu');
            console.log(nav)
            nav.style.display = 'none'
        }

    }, [])

    return (
        <div className='flex h-screen gap-6'>
            <DashboardSidebar />
            <div className='p-8'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;