import { ALL_POST, FILTER_CATEGORY, HOME_ALL_POST, YOUR_POST } from "../actionTypes/actionTypes"


export const initialState = {
    dashboardFilter: {
        allPost: true,
        yourPost: false,
    },
    homePageFilter: {
        filterCategory: '',
        allPost: false
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
            return {
                ...state,
                homePageFilter: {
                    ...state.homePageFilter,
                    filterCategory: action.payload,
                    allPost: false
                }
            }
        case HOME_ALL_POST:
            return {
                ...state,
                homePageFilter:{
                    ...state.homePageFilter,
                    filterCategory: '',
                    allPost: true
                }
            }
            default: return state
    }
}