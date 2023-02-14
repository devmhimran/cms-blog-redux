
const loadSingleCategoryData = (id) => {
    return async (dispatch, getState) => {
        const res = await fetch(`https://cms-blog-redux-server.vercel.app/category/${id}`)
        const data = await res.json()
        // dispatch(loadSingleCategory(data))
    }
}

export default loadSingleCategoryData