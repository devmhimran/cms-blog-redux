import { useEffect, useState } from "react";


const useSignInToken = (user) =>{
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email;
        const uid = user?.user?.uid

        const currentUser = {
            email,
            uid
        };

        if (email) {
            fetch(`https://cms-blog-redux-server.vercel.app/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                });
        }
    }, [user])

    return [token];
}

export default useSignInToken;