import { ADD_BLOG, ADD_CATEGORY, DELETE_BLOG, DELETE_CATEGORY, LOAD_BLOG, LOAD_CATEGORY, LOAD_SINGLE_CATEGORY, UPDATE_CATEGORY } from "../actionTypes/actionTypes"


export const addCategory = (data) =>{
    return {
        type: ADD_CATEGORY,
        payload: data
    }
}

export const loadCategory = (data) =>{
    return {
        type: LOAD_CATEGORY,
        payload: data
    }
}

export const deleteCategory = (data) =>{
    return {
        type: DELETE_CATEGORY,
        payload: data
    }
}

export const updateCategory = (data) =>{
    return {
        type: UPDATE_CATEGORY,
        payload: data
    }
}

export const addBlog = (data) =>{
    return {
        type: ADD_BLOG,
        payload: data
    }
}

export const loadBlog = (data) =>{
    return{
        type: LOAD_BLOG,
        payload: data
    }
}

export const deleteBlog = (data) =>{
    return{
        type: DELETE_BLOG,
        payload: data
    }
}