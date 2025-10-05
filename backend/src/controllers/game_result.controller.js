import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiError } from "../utils/api_errors.util.js";
import { ApiResponse } from "../utils/api_response.util.js";
import { GameResult } from "../models/game_result.model.js";
import { Game } from "../models/game.model.js";

const createGameResult = asyncHandler(async (req, res) => {
    const { gameId, score, timeCompleted, wasSuccessful } = req.body;

    if (!gameId || score === undefined || !timeCompleted || wasSuccessful === undefined) {
        throw new ApiError(400, "Game ID, score, time completed, and success status are required");
    }

    if (!mongoose.isValidObjectId(gameId)) {
        throw new ApiError(400, "Invalid Game ID");
    }

    const gameExists = await Game.findById(gameId);
    if (!gameExists) {
        throw new ApiError(404, "Game not found");
    }

    const gameResult = await GameResult.create({
        gameId,
        score,
        timeCompleted,
        wasSuccessful,
        userId: req.user._id,
    });

    if (!gameResult) {
        throw new ApiError(500, "Something went wrong while saving the game result");
    }

    return res.status(201).json(
        new ApiResponse(201, gameResult, "Game result saved successfully")
    );
});

const getGameResultsForUser = asyncHandler(async (req, res) => {
    const results = await GameResult.find({ userId: req.user._id })
        .populate("gameId", "title type")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, results, "User game results retrieved successfully")
    );
});

const getGameResultsByGame = asyncHandler(async (req, res) => {
    const { gameId } = req.params;

    if (!mongoose.isValidObjectId(gameId)) {
        throw new ApiError(400, "Invalid Game ID");
    }

    const results = await GameResult.find({
        userId: req.user._id,
        gameId: gameId,
    }).sort({ score: -1 });

    return res.status(200).json(
        new ApiResponse(200, results, "Game results for this game retrieved successfully")
    );
});

const getGameResultById = asyncHandler(async (req, res) => {
    const { resultId } = req.params;

    if (!mongoose.isValidObjectId(resultId)) {
        throw new ApiError(400, "Invalid game result ID");
    }

    const result = await GameResult.findById(resultId);

    if (!result || result.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Game result not found");
    }

    return res.status(200).json(
        new ApiResponse(200, result, "Game result retrieved successfully")
    );
});

const deleteGameResult = asyncHandler(async (req, res) => {
    const { resultId } = req.params;

    if (!mongoose.isValidObjectId(resultId)) {
        throw new ApiError(400, "Invalid game result ID");
    }

    const resultToDelete = await GameResult.findById(resultId);

    if (!resultToDelete || resultToDelete.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Game result not found");
    }

    await GameResult.findByIdAndDelete(resultId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Game result deleted successfully")
    );
});

export {
    createGameResult,
    getGameResultsForUser,
    getGameResultsByGame,
    getGameResultById,
    deleteGameResult,
};
