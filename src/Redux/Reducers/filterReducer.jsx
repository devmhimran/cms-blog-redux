import { ALL_POST, FILTER_CATEGORY, YOUR_POST } from "../actionTypes/actionTypes"


export const initialState = {
    dashboardFilter: {
        allPost: true,
        yourPost: false,
    },
    homePageFilter:{
        filterCategory: ''
    }
}

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_POST:
            return {
                ...state,
                dashboardFilter: {
                    ...state.dashboardFilter,
                    allPost: true,
                    yourPost: false
                }
            }
        case YOUR_POST:
            return {
                ...state,
                dashboardFilter: {
                    ...state.dashboardFilter,
                    allPost: false,
                    yourPost: true
                }
            }
        case FILTER_CATEGORY:
            return{
                ...state,
                homePageFilter:{
                    ...state.homePageFilter,
                    filterCategory: action.payload
                }
            }
            default: return state
    }
}