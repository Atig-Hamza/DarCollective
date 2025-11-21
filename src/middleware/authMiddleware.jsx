import React, { use, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AuthMiddleware({children}) {
    const navigate = useNavigate();
    let content = null
    useEffect(() => {
        async function validateToken() {
            const token = localStorage.getItem('token');
            console.log('Token from localStorage:', token);
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const response = await axios.post('http://localhost:5000/api/v1/auth/validate-token', {
                    token
                });
                console.log('Token validation response:', response.data);
                content = children;
            } catch (error) {
                console.error('Token validation error:', error);
                navigate('/login');
            }
        };
        validateToken()
    }, []);
    return (
        <>{null}</>
    )
}
