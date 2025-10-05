// A generic API response structure
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

// User-related types
export interface User {
    _id: string;
    fullName: string;
    email: string;
    age?: number;
}

// Story-related types
// export interface Story {
//     _id: string;
//     title: string;
//     content: string;
//     authorId: string;
// }



export interface Story {
  id: string;
  title: string;
  content: string;
  genre: string;
  emotion: string;
  completed?: boolean;
  progress?: number;
}

export type CreateStoryPayload = Omit<Story, '_id' | 'authorId'>;

// Game-related types
export interface GameSession {
    _id: string;
    storyId: string;
    userId: string;
    score: number;
    completed: boolean;
}

// Result-related types
export interface GameResult {
    _id: string;
    gameSessionId: string;
    userId: string;
    finalScore: number;
    rank: number;
}
