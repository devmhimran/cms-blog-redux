import { ALL_POST, YOUR_POST } from "../actionTypes/actionTypes"


export const initialState = {
     dashboardFilter : {
        allPost: true,
        yourPost: false
    }
}

export const filterReducer = (state = initialState, action) =>{
    switch(action.type){
        case ALL_POST:
            return {
                ...state,
                dashboardFilter:{
                    ...state.dashboardFilter,
                    allPost: true,
                    yourPost: false
                }
            }
        case YOUR_POST:
            return {
                ...state,
                dashboardFilter:{
                    ...state.dashboardFilter,
                    allPost: false,
                    yourPost: true
                }
            }
            default : return state
    }
}