import { deleteUser } from "../actionCreators/actionCreators"


export const deleteUserData = (id) => {
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:5000/user-delete/${id}`, {
            method: "Delete",
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await res.json()
        if (data.acknowledged) {
            dispatch(deleteUser(id))
        }

    }
}