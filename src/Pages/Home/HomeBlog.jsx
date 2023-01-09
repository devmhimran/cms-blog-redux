import React from 'react';

const HomeBlog = ({ data }) => {
    const { blogTitle, featuredImage, content } = data
    return (
        <div className="card border rounded-3xl">
            <div className="card-body p-3">
                <img className='w-full rounded-2xl' src={featuredImage} alt={blogTitle} />
                <div className="blog__content">
                    <h2 className='text-xl'>{blogTitle.slice(0, 38)}...</h2>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
};

export default HomeBlog;