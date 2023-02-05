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
        console.log(currentUser)

        if (email) {
            fetch(`http://localhost:5000/user/${email}`, {
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

    console.log(token)
    return [token];
}

export default useSignInToken;