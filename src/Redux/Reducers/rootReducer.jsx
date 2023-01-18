import { combineReducers } from "redux";
import { blogReducer } from "./blogReducer";
import { filterReducer } from "./filterReducer";
import { paginationReducer } from "./paginationReducer";



const rootReducer = combineReducers({
    blog: blogReducer,
    filter: filterReducer,
    pagination: paginationReducer
})

export default rootReducer;