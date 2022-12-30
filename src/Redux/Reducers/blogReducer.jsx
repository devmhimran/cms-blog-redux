import { ADD_CATEGORY, DELETE_CATEGORY, LOAD_CATEGORY, LOAD_SINGLE_CATEGORY, UPDATE_CATEGORY } from "../actionTypes/actionTypes"

export const initialState = {
    blog: [],
    category: [],
    favorite: []
}

export const blogReducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {

        case LOAD_CATEGORY:
            return {
                ...state,
                category: action.payload,
            }
        case ADD_CATEGORY:
            return {
                ...state,
                category: [...state.category, action.payload]
            }
        case UPDATE_CATEGORY:
            console.log(action.payload)
            const previousCategory = state.category.filter(data => data._id !== action.payload._id);
            
            console.log(previousCategory)
            return {
                ...state,
                category: [...previousCategory, action.payload]
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                category: state.category.filter(data => data._id !== action.payload)
            }

        default: return state
    }

}