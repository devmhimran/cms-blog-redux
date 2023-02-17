import { combineReducers } from "redux";
import { blogReducer } from "./blogReducer";
import { filterReducer } from "./filterReducer";
import { paginationReducer } from "./paginationReducer";
import featuredBlogReducer from "./featuredBlogReducer";
import commentReducer from "./commentReducer";
import { userSignUpReducer } from "./userSignUpReducer";
import { userReducer } from "./userReducer";



const rootReducer = combineReducers({
    blog: blogReducer,
    filter: filterReducer,
    pagination: paginationReducer,
    featuredBlogReducer: featuredBlogReducer,
    comment: commentReducer,
    userDataAuth: userSignUpReducer,
    users: userReducer
})

export default rootReducer;