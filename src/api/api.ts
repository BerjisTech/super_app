import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
});

// Add interceptors, headers, etc.
// Request Interceptor: Add Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Replace with your token fetching logic
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log('Sending Request:', config);
        return config;
    },
    (error) => {
        console.log('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response Interceptor: Log responses and errors
api.interceptors.response.use(
    (response) => {
        console.log('Received Response:', response);
        return response;
    },
    (error) => {
        console.log('Response Error:', error);
        return Promise.reject(error);
    }
);

export default api;
