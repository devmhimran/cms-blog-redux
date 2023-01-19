import { ADD_BLOG, ADD_CATEGORY, DELETE_BLOG, DELETE_CATEGORY, HOME_BLOG, LOAD_BLOG, LOAD_CATEGORY, LOAD_SINGLE_CATEGORY, PAGE_COUNT, UPDATE_CATEGORY } from "../actionTypes/actionTypes"

export const initialState = {
    blog: [],
    homeBlog: [],
    category: [],
    favorite: [],
    pageNum: ''
}

export const blogReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_CATEGORY:
            return {
                ...state,
                category: action.payload,
            }
        case LOAD_BLOG:
            return {
                ...state,
                blog: action.payload
            }
        case ADD_CATEGORY:
            return {
                ...state,
                category: [...state.category, action.payload]
            }
        case ADD_BLOG:
            return {
                ...state,
                blog: [...state.blog, action.payload]
            }
        case UPDATE_CATEGORY:
            const previousCategory = state.category.filter(data => data._id !== action.payload._id);
            return {
                ...state,
                category: [...previousCategory, action.payload]
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                category: state.category.filter(data => data._id !== action.payload)
            }
        case DELETE_BLOG:
            return {
                ...state,
                blog: state.blog.filter(data => data._id !== action.payload)
            }
        case PAGE_COUNT:
            return {
                ...state,
                pageNum: action.payload
            }
        case HOME_BLOG:
            return {
                ...state,
                homeBlog: action.payload
            }

        default: return state
    }

}