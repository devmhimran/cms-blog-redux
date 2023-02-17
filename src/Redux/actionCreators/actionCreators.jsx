import { ADD_BLOG, ADD_CATEGORY, ADD_COMMENT, ADD_TO_FAVORITE, DELETE_BLOG, DELETE_CATEGORY, DELETE_USER, EMPTY_FAVORITE, FETCH_ERROR, FETCH_START, FILTER_CATEGORY, HOME_ALL_POST, HOME_BLOG, LOAD_BLOG, LOAD_CATEGORY, LOAD_COMMENT, LOAD_FAVORITE, LOAD_SINGLE_CATEGORY, LOAD_USERS, PAGE_COUNT, REMOVE_TO_FAVORITE, TOGGLE_FEATURED_BLOG, UPDATE_CATEGORY, USER_DATA_SIGN_UP } from "../actionTypes/actionTypes"


export const addCategory = (data) => {
    return {
        type: ADD_CATEGORY,
        payload: data
    }
}

export const loadCategory = (data) => {
    return {
        type: LOAD_CATEGORY,
        payload: data
    }
}

export const deleteCategory = (data) => {
    return {
        type: DELETE_CATEGORY,
        payload: data
    }
}

export const updateCategory = (data) => {
    return {
        type: UPDATE_CATEGORY,
        payload: data
    }
}

export const addBlog = (data) => {
    return {
        type: ADD_BLOG,
        payload: data
    }
}

export const loadBlog = (data) => {
    return {
        type: LOAD_BLOG,
        payload: data
    }
}

export const loadHomeBlog = (data) => {
    return {
        type: HOME_BLOG,
        payload: data
    }
}

export const deleteBlog = (data) => {
    return {
        type: DELETE_BLOG,
        payload: data
    }
}

export const categoryFilter = (data) => {
    return {
        type: FILTER_CATEGORY,
        payload: data
    }
}

export const homeAllPost = () => {
    return {
        type: HOME_ALL_POST
    }
}

export const pageCountNum = (data) => {
    return {
        type: PAGE_COUNT,
        payload: data
    }
}

export const fetchStart = () => {
    return {
        type: FETCH_START
    }
}

export const fetchError = () => {
    return {
        type: FETCH_ERROR
    }
}

export const toggleFeaturedBlog = (data) => {
    return {
        type: TOGGLE_FEATURED_BLOG,
        payload: data
    }
}

export const addComment = (data) => {
    return {
        type: ADD_COMMENT,
        payload: data
    }
}

export const loadComment = (data) => {
    return {
        type: LOAD_COMMENT,
        payload: data
    }
}

export const userDataSignUp = (data) =>{
    return {
        type: USER_DATA_SIGN_UP,
        payload: data
    }
}

export const loadFavorite = (data) =>{
    return {
        type: LOAD_FAVORITE,
        payload: data
    }
}

export const addToFavorite = (data) =>{
    return {
        type: ADD_TO_FAVORITE,
        payload: data
    }
}

export const removeToFavorite = (data) =>{
    return {
        type: REMOVE_TO_FAVORITE,
        payload: data
    }
}

export const emptyFavorite = () =>{
    return {
        type: EMPTY_FAVORITE,
    }
}

export const deleteUser = (data) =>{
    return {
        type: DELETE_USER,
        payload: data
    }
}

export const loadUsers = (data) =>{
    return {
        type: LOAD_USERS,
        payload: data
    }
}