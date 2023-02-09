import React, { useEffect } from 'react';
import PageTitle from '../../Component/PageTitle/PageTitle';
import { useSelector } from 'react-redux';
import HomeBlog from '../../Component/HomeBlog/HomeBlog';

const Favorite = () => {
    const { favorite, homeBlog } = useSelector(state => state.blog)
    let content;
    // const output = Object.entries(
    //     favorite.reduce((prev, { homeBlog }) => {
    //         console.log([homeBlog])
    //         prev[homeBlog] = prev[homeBlog] ? prev[homeBlog] + 1 : 1;
    //         return prev;
    //     }, {})
    //     )
    //     .map(([homeBlog, count]) => ({ homeBlog, count }))
    //     .sort((a, b) => b.count - a.count);
    //     console.log(output)
    // if(favorite.length){
    //     content = favorite.filter(data =>)
    // }

    // if (favorite.length) {
    //     content = homeBlog.filter(data => favorite.includes(data._id)).map(data => <HomeBlog key={data._id} data={data} />)
    // }

    function getMatchingObjects(array1, array2) {
        const matchingObjects = [];
        for (let i = 0; i < array1.length; i++) {
            // console.log(array1[i])
          for (let j = 0; j < array2.length; j++) {
            if (JSON.stringify(array1[i]._id) === JSON.stringify(array2[j].postId)) {
              matchingObjects.push(array1[i]);
            }
          }
        }
        return matchingObjects;
      }
      useEffect(()=>{
        
      },[favorite.length])
      const output = getMatchingObjects(homeBlog, favorite)
      if (favorite.length) {
        content = output.map(data => <HomeBlog key={data._id} data={data} />)
    }
    
    // console.log(favorite, homeBlog)
    // console.log(v)

    // if (favorite.length) {
    //     content = homeBlog.filter(data => {
    //         favorite.filter(favoriteData => favoriteData.includes(data._id))
    //     }
    //     ).map(data => <HomeBlog key={data._id} data={data} />)
    // }

    if (favorite.length === 0) {

        content =
            <>
                <div className='h-[67vh]'>
                    <h1 className='font-bold text-5xl text-gray-500 mt-16'>No Favorite Yet</h1>
                </div>
            </>
    }
    // console.log(favorite.length)
    return (
        <div className='container max-w-screen-xl lg:mx-auto lg:px-0 px-3 py-12'>
            <PageTitle title='Favorite' />
            <h1 className='text-4xl font-bold syne my-4'>Favorite Post❤️️</h1>
            <div className="postHub__blog">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        content
                    }
                </div>
            </div>
        </div>
    );
};

export default Favorite;