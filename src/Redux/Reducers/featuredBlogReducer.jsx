import { TOGGLE_FEATURED_BLOG } from "../actionTypes/actionTypes";

const initialState = {
    featuredBlog: false
}

const featuredBlogReducer = (state = initialState, action) => {
    let data;
    switch (action.type) {
        case TOGGLE_FEATURED_BLOG:
            if (action.payload === true) {
                data = true
            } else {
                data = false
            }
            return {
                ...state,
                featuredBlog: data
            }
        default: return state
    }

};

export default featuredBlogReducer;