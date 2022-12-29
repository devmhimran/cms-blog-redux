import { updateCategory } from "../actionCreators/categoryActionCreators";


const updateCategoryData = (id, category) => {
    console.log(id, category)
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:5000/category/${id}`, {
            method: "PUT",
            body: JSON.stringify(category),
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await res.json();
        console.log(data.upsertedId)
        console.log()
        if (data.acknowledged) {
            dispatch(updateCategory(
                {
                    _id: id,
                    ...category
                }))
        }

        // console.log('u category data', data)
        // console.log('data', data)
    }
}

export default updateCategoryData