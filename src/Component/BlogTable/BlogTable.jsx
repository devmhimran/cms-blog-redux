import React from 'react';

const BlogTable = ({data, index}) => {
    const {_id, featuredImage, blogTitle, blogCategory} = data
    return (
        <tr>
            <td>{index + 1 }</td>
            <td><img className='w-14' src={data.featuredImage} alt="" /></td>
            <td>{data.blogTitle}</td>
        </tr>
    );
};

export default BlogTable;