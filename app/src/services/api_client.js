import axios from 'axios';

// --- CONFIGURATION ---
// Replace with your actual API base URL
const API_BASE_URL = 'https://api.yourdomain.com/v1'; 

// --- TEMPORARY USER ID ---
// This is a placeholder. In the future, this will be replaced by a function
// that retrieves the logged-in user's ID or token.
const getCurrentUserId = () => {
    return 'user1'; // Hardcoded for now
};

// --- AXIOS INSTANCE ---
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- INTERCEPTORS (Future-proofing for Auth) ---
// This is where you will add the logic to attach the auth token to every request.
// It's commented out for now but ready for you to implement later.
/*
apiClient.interceptors.request.use(async (config) => {
    // const token = await getTokenFromSecureStorage(); // Example function
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
}, (error) => {
    return Promise.reject(error);
});
*/

export { apiClient, getCurrentUserId };
