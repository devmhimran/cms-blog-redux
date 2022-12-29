import { ADD_CATEGORY, DELETE_CATEGORY, LOAD_CATEGORY } from "../actionTypes/actionTypes"

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
                category: action.payload
            }
        case ADD_CATEGORY:
            return {
                ...state,
                category: [...state.category, action.payload]
            }
            case DELETE_CATEGORY:
                return{
                    ...state,
                    category: state.category.filter(data => data._id !== action.payload)
                }
        default: return state
    }

}