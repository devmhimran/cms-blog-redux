import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useToken = (value) => {
    const [token, setToken] = useState('');

    // const {email, uid, name, profileImage} = user
    // const email = user?.user?.email;
    // const uid = user?.user?.uid
    // const name = user?.user?.displayName
    // const profileImage = user?.user?.photoURL
    // const value = 
    // const dispatch = useDispatch();
    // const value = useSelector(state => state => state.userSignUpData)
    console.log(value)
    useEffect(() => {
        // const email = user?.user?.email;
        // const uid = user?.user?.uid

        const currentUser = {
            uid: value?.user?.user?.uid,
            profileImage: value?.featuredImage,
            name: value?.name,
            email: value?.user?.user?.email
        };
        console.log(currentUser)

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

    console.log(token)
    return [token];
};

export default useToken;