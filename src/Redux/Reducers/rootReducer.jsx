import { combineReducers } from "redux";
import { blogReducer } from "./blogReducer";
import { filterReducer } from "./filterReducer";
import { paginationReducer } from "./paginationReducer";
import featuredBlogReducer from "./featuredBlogReducer";



const rootReducer = combineReducers({
    blog: blogReducer,
    filter: filterReducer,
    pagination: paginationReducer,
    featuredBlogReducer: featuredBlogReducer
})

export default rootReducer;