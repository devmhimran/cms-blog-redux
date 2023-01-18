import { ADD_BLOG, ADD_CATEGORY, DELETE_BLOG, DELETE_CATEGORY, FILTER_CATEGORY, HOME_ALL_POST, LOAD_BLOG, LOAD_CATEGORY, LOAD_SINGLE_CATEGORY, PAGE_COUNT, UPDATE_CATEGORY } from "../actionTypes/actionTypes"


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