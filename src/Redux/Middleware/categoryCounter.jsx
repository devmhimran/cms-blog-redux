import { ADD_CATEGORY } from "../actionTypes/actionTypes";


const categoryCounter = (store) => (next) => (action) =>{
    const state = store.getState();
    const category = state.blog.category
    console.log(category)
    if(action.type === ADD_CATEGORY){
        const newAction = {
            ...action,
            payload :{
                ...action.payload, categoryPosition: category.length
            }
        }
        return next (newAction)
    }
    return next (action)
}

export default categoryCounter