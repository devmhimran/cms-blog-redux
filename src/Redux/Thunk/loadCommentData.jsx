import React from 'react';
import { loadComment } from '../actionCreators/actionCreators';

const loadCommentData = () => {
    return async (dispatch) => {
        const res = await fetch('http://localhost:5000/comment')
        const data = await res.json()
        if (data.length) {
            dispatch(loadComment(data))
        }
    }
};

export default loadCommentData;