import { ADD_CATEGORY, DELETE_CATEGORY, LOAD_CATEGORY } from "../actionTypes/actionTypes"


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