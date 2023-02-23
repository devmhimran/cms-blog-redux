import { loadUsers } from "../actionCreators/actionCreators"


const loadUsersData = () => {
    return async (dispatch) => {
        const res = await fetch('https://cms-blog-redux-server.vercel.app/users', {
            method: "GET",
            headers: {
                "authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        const data = await res.json()
        if (data.length) {
            dispatch(loadUsers(data))
        }
    }
}

export default loadUsersData