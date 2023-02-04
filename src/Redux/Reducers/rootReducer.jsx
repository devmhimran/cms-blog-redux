import { combineReducers } from "redux";
import { blogReducer } from "./blogReducer";
import { filterReducer } from "./filterReducer";
import { paginationReducer } from "./paginationReducer";
import featuredBlogReducer from "./featuredBlogReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
    blog: blogReducer,
    filter: filterReducer,
    pagination: paginationReducer,
    featuredBlogReducer: featuredBlogReducer,
    comment: commentReducer
})

export default rootReducer;