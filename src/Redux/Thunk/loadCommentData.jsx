import React from 'react';
import { loadComment } from '../actionCreators/actionCreators';

const loadCommentData = () => {
    return async (dispatch) => {
        const res = await fetch('https://cms-blog-redux-server.vercel.app/comment')
        const data = await res.json()
        if (data.length) {
            dispatch(loadComment(data))
        }
    }
};

export default loadCommentData;