import { ADD_BLOG, ADD_CATEGORY, DELETE_BLOG, DELETE_CATEGORY, LOAD_BLOG, LOAD_CATEGORY, LOAD_SINGLE_CATEGORY, UPDATE_CATEGORY } from "../actionTypes/actionTypes"

export const initialState = {
    blog: [],
    category: [],
    favorite: []
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
                return{
                    ...state,
                    blog: state.blog.filter(data => data._id !== action.payload)
                }

        default: return state
    }

}