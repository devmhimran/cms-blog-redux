import React from 'react';

const SearchResult = ({ searchData }) => {
    const { blogTitle } = searchData
    console.log(searchData)
    return (
        <div>
            {
                searchData.map(data => <>
                    <div className='flex items-center gap-3 my-5'>
                        <img className='w-14 h-14 object-cover rounded-xl' src={data.featuredImage} alt="" />
                        <p>{data.blogTitle}</p>
                    </div>
                </>)
            }

        </div>
    );
};

export default SearchResult;