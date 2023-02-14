
const loadSingleCategoryData = (id) => {
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:5000/category/${id}`)
        const data = await res.json()
    }
}

export default loadSingleCategoryData