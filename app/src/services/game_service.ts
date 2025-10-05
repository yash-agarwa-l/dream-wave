import { apiClient, getCurrentUserId } from './api_client';
import { GameSession, ApiResponse } from './model';

const startGame = async (storyId: string): Promise<ApiResponse<GameSession>> => {
    const userId = getCurrentUserId(); // Using the placeholder user
    const response = await apiClient.post('/games/start', { storyId, userId });
    return response.data;
};

const submitAnswer = async (gameSessionId: string, answer: any): Promise<ApiResponse<GameSession>> => {
    const response = await apiClient.post(`/games/${gameSessionId}/answer`, { answer });
    return response.data;
};

export const gameService = {
    startGame,
    submitAnswer,
};
