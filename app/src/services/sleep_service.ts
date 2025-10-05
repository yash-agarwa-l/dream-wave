import { apiClient, getCurrentUserId } from './api_client';
import { Story, CreateStoryPayload, ApiResponse } from './model';

const getStories = async (): Promise<ApiResponse<Story[]>> => {
    const response = await apiClient.get('/stories');
    return response.data;
};

const getStoryById = async (storyId: string): Promise<ApiResponse<Story>> => {
    const response = await apiClient.get(`/stories/${storyId}`);
    return response.data;
};

const createStory = async (storyData: CreateStoryPayload): Promise<ApiResponse<Story>> => {
    const userId = getCurrentUserId();
    const payload = { ...storyData, authorId: userId };
    const response = await apiClient.post('/stories', payload);
    return response.data;
};

export const storyService = {
    getStories,
    getStoryById,
    createStory,
};

