import { ALL_POST, YOUR_POST } from "../actionTypes/actionTypes"


export const allPostAction = () =>{
    return {
        type: ALL_POST,
    }
}

export const yourPostAction = () =>{
    return {
        type: YOUR_POST,
    }
}