import React, { useEffect } from 'react';
import axios from 'axios';

function Home() {

    const getData = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            if (!token) {
                console.error('Token not found in local storage');
                return;
            }

            const response = await axios.post('/api/user/get-user-info-by-id', {},
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
            console.log('User Info:', response.data);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }

    useEffect(() => {

        getData()

    }, [])

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Home;