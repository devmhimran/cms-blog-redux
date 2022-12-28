import React from 'react';

const SidebarHeading = ({title}) => {
    return (
        <div>
            <div className="heading">
                <h1 className='text-4xl syne font-bold mb-3'>{title}</h1>
            </div>
            <div className="divider w-full">
                <hr />
            </div>
        </div>
    );
};

export default SidebarHeading;