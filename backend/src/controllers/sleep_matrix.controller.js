import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiError } from "../utils/api_errors.util.js";
import { ApiResponse } from "../utils/api_response.util.js";
import { SleepSession } from "../models/sleepSession.model.js";

const createSleepSession = asyncHandler(async (req, res) => {
    const { date, currentStatus, liveMetrics, sleepQuality, dreamData } = req.body;

    if (!date || !currentStatus) {
        throw new ApiError(400, "Date and currentStatus are required");
    }

    const session = await SleepSession.create({
        date,
        currentStatus,
        liveMetrics,
        sleepQuality,
        dreamData,
        userId: req.user._id,
    });

    if (!session) {
        throw new ApiError(500, "Something went wrong while creating the sleep session");
    }

    return res.status(201).json(
        new ApiResponse(201, session, "Sleep session created successfully")
    );
});

const getUserSleepSessions = asyncHandler(async (req, res) => {
    const sessions = await SleepSession.find({ userId: req.user._id }).sort({ date: -1 });

    return res.status(200).json(
        new ApiResponse(200, sessions, "User sleep sessions retrieved successfully")
    );
});

const getLatestSleepSession = asyncHandler(async (req, res) => {
    const latestSession = await SleepSession.findOne({ userId: req.user._id }).sort({ createdAt: -1 });

    if (!latestSession) {
        throw new ApiError(404, "No sleep session found for this user");
    }

    return res.status(200).json(
        new ApiResponse(200, latestSession, "Latest sleep session retrieved successfully")
    );
});

const getSleepSessionById = asyncHandler(async (req, res) => {
    const { sessionId } = req.params;

    if (!mongoose.isValidObjectId(sessionId)) {
        throw new ApiError(400, "Invalid sleep session ID");
    }

    const session = await SleepSession.findById(sessionId);

    if (!session || session.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Sleep session not found");
    }

    return res.status(200).json(
        new ApiResponse(200, session, "Sleep session retrieved successfully")
    );
});

const updateSleepSession = asyncHandler(async (req, res) => {
    const { sessionId } = req.params;
    const { ...updateData } = req.body;

    if (!mongoose.isValidObjectId(sessionId)) {
        throw new ApiError(400, "Invalid sleep session ID");
    }

    const sessionToUpdate = await SleepSession.findById(sessionId);

    if (!sessionToUpdate || sessionToUpdate.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Sleep session not found");
    }

    const updatedSession = await SleepSession.findByIdAndUpdate(
        sessionId,
        { $set: updateData },
        { new: true }
    );

    if (!updatedSession) {
        throw new ApiError(500, "Something went wrong while updating the sleep session");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedSession, "Sleep session updated successfully")
    );
});

const deleteSleepSession = asyncHandler(async (req, res) => {
    const { sessionId } = req.params;

    if (!mongoose.isValidObjectId(sessionId)) {
        throw new ApiError(400, "Invalid sleep session ID");
    }

    const sessionToDelete = await SleepSession.findById(sessionId);

    if (!sessionToDelete || sessionToDelete.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Sleep session not found");
    }

    await SleepSession.findByIdAndDelete(sessionId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Sleep session deleted successfully")
    );
});

export {
    createSleepSession,
    getUserSleepSessions,
    getLatestSleepSession,
    getSleepSessionById,
    updateSleepSession,
    deleteSleepSession,
};
