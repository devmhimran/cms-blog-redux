import { loadUsers } from "../actionCreators/actionCreators"


const loadUsersData = () => {
    return async (dispatch) => {
        const res = await fetch('http://localhost:5000/users', {
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