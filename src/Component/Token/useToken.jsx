import React, { useEffect, useState } from 'react';

const useToken = (value) => {
    const [token, setToken] = useState('');

    useEffect(() => {

        const currentUser = {
            uid: value?.user?.user?.uid,
            profileImage: value?.featuredImage,
            name: value?.name,
            email: value?.user?.user?.email
        };

        if (value?.user?.user?.email) {
            fetch(`https://cms-blog-redux-server.vercel.app/user/${value?.user?.user?.email}`, {
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
    }, [value])

    return [token];
};

export default useToken;