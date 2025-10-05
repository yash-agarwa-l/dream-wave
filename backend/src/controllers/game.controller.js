import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiError } from "../utils/api_errors.util.js";
import { ApiResponse } from "../utils/api_response.util.js";
import { Game } from "../models/game.model.js";

const createGame = asyncHandler(async (req, res) => {
    const { title, type, description, difficulty, duration, emotion, journalEntryId } = req.body;

    if (!title || !type || !description) {
        throw new ApiError(400, "Title, type, and description are required");
    }

    const game = await Game.create({
        title,
        type,
        description,
        difficulty,
        duration,
        emotion,
        journalEntryId: journalEntryId || null,
        userId: req.user._id,
    });

    if (!game) {
        throw new ApiError(500, "Something went wrong while creating the game");
    }

    return res.status(201).json(
        new ApiResponse(201, game, "Game created successfully")
    );
});

const getUserGames = asyncHandler(async (req, res) => {
    const games = await Game.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, games, "User games retrieved successfully")
    );
});

const getGameById = asyncHandler(async (req, res) => {
    const { gameId } = req.params;

    if (!mongoose.isValidObjectId(gameId)) {
        throw new ApiError(400, "Invalid game ID");
    }

    const game = await Game.findById(gameId);

    if (!game || game.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Game not found");
    }

    return res.status(200).json(
        new ApiResponse(200, game, "Game retrieved successfully")
    );
});

const updateGame = asyncHandler(async (req, res) => {
    const { gameId } = req.params;
    const { rating, isCompleted } = req.body;

    if (!mongoose.isValidObjectId(gameId)) {
        throw new ApiError(400, "Invalid game ID");
    }
    
    const gameToUpdate = await Game.findById(gameId);

    if (!gameToUpdate || gameToUpdate.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Game not found");
    }

    const updatedGame = await Game.findByIdAndUpdate(
        gameId,
        {
            $set: {
                rating,
                isCompleted,
            },
        },
        { new: true }
    );

    if (!updatedGame) {
        throw new ApiError(500, "Something went wrong while updating the game");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedGame, "Game updated successfully")
    );
});

const deleteGame = asyncHandler(async (req, res) => {
    const { gameId } = req.params;

    if (!mongoose.isValidObjectId(gameId)) {
        throw new ApiError(400, "Invalid game ID");
    }

    const gameToDelete = await Game.findById(gameId);

    if (!gameToDelete || gameToDelete.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Game not found");
    }

    await Game.findByIdAndDelete(gameId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Game deleted successfully")
    );
});

export {
    createGame,
    getUserGames,
    getGameById,
    updateGame,
    deleteGame
};
