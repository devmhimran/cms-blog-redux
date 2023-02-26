import { userRole } from '../actionCreators/actionCreators';
import toastify from '../../Component/Toastify/Toastify';

const userRoleData = (userRole, id) => {
    return async (dispatch) =>{
        const res = await fetch(`https://cms-blog-redux-server.vercel.app/user/admin/${id}`, {
            method: "PUT",
            body: JSON.stringify(userRole),
            headers: {
                "Content-type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        const data = await res.json();
        if (data.acknowledged) {
            window.location.reload();
            toastify('success', 'Successfully Updated')
        }
    }
};

export default userRoleData;