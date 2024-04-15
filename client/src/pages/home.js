import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

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
        } catch (error) {
        }
    }

    useEffect(() => {

        getData()

    }, [])

    return (
        <Layout>
            <h1>Homepage</h1>
        </Layout>
    );
}

export default Home;