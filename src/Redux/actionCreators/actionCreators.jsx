import { ADD_BLOG, ADD_CATEGORY, DELETE_BLOG, DELETE_CATEGORY, FETCH_ERROR, FETCH_START, FILTER_CATEGORY, HOME_ALL_POST, HOME_BLOG, LOAD_BLOG, LOAD_CATEGORY, LOAD_SINGLE_CATEGORY, PAGE_COUNT, TOGGLE_FEATURED_BLOG, UPDATE_CATEGORY } from "../actionTypes/actionTypes"


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
        type:  HOME_BLOG,
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

export const homeAllPost = () =>{
    return {
        type: HOME_ALL_POST
    }
}

export const pageCountNum = (data) =>{
    return {
        type: PAGE_COUNT,
        payload: data
    }
}

export const fetchStart = () =>{
    return {
        type: FETCH_START
    }
}

export const fetchError = () =>{
    return {
        type: FETCH_ERROR
    }
}

export const toggleFeaturedBlog = (data) =>{
    return {
        type: TOGGLE_FEATURED_BLOG,
        payload: data
    }
}