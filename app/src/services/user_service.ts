import { apiClient } from './api_client';
import { User, ApiResponse } from './model';

const register = async (userData: { fullName: string; email: string; age?: number, password: string }) => {
    const response = await apiClient.post<ApiResponse<User>>('/users/register', userData);
    return response.data;
};

const login = async (credentials: { email: string, password: string }) => {
    const response = await apiClient.post<ApiResponse<{ user: User }>>('/users/login', credentials);
    return response.data;
};

const logout = async () => {
    const response = await apiClient.post<ApiResponse<{}>>('/users/logout');
    return response.data;
};


export const userService = {
    register,
    login,
    logout,
};
