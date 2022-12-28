import { ADD_CATEGORY } from "../actionTypes/actionTypes"

export const initialState = {
    blog: [],
    category: [],
    favorite: []
} 

export const blogReducer = (state = initialState, action) =>{
    switch(action.type){

        case ADD_CATEGORY:
            return{
                ...state,
                category: [...state.category, action.payload]
            }

        default: return state
    }
  
}