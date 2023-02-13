import React from 'react';
import { Link } from 'react-router-dom';

const SearchResult = ({ searchData }) => {
    const { blogTitle } = searchData
    console.log(searchData)
    return (
        <div>
            {
                searchData.slice(0, 6).map(data => <>
                    <div className='flex items-center gap-3 m-4'>
                        <img className='w-14 h-14 object-cover rounded-xl' src={data.featuredImage} alt="" />
                        <p className='text-base'><Link to={`/blog/${data._id}`}>{data.blogTitle}</Link></p>
                       
                    </div>
                </>)
            }

        </div>
    );
};

export default SearchResult;