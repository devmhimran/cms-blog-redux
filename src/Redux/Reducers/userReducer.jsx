import { DELETE_USER, LOAD_USERS, USER_ROLE } from "../actionTypes/actionTypes"

const initialState = {
    users: []
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS:
            return {
                ...state,
                users: action.payload
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(data => data._id !== action.payload)
            }
        default: return state
    }
    return state
}