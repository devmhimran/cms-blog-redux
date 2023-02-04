import { combineReducers } from "redux";
import { blogReducer } from "./blogReducer";
import { filterReducer } from "./filterReducer";
import { paginationReducer } from "./paginationReducer";
import featuredBlogReducer from "./featuredBlogReducer";
import commentReducer from "./commentReducer";
import { userSignUpReducer } from "./userSignUpReducer";



const rootReducer = combineReducers({
    blog: blogReducer,
    filter: filterReducer,
    pagination: paginationReducer,
    featuredBlogReducer: featuredBlogReducer,
    comment: commentReducer,
    userDataAuth: userSignUpReducer
})

export default rootReducer;