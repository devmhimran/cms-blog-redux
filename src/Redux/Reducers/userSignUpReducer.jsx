import { USER_DATA_SIGN_UP } from "../actionTypes/actionTypes"


const initialState = {
    userData: {}
}

export const userSignUpReducer = (state = initialState, action) =>{
    switch(action.type){
        case USER_DATA_SIGN_UP:
            return{
                ...state,
                userData: action.payload
            }
    }
    return state
}