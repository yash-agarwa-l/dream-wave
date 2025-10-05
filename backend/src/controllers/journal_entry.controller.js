import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiError } from "../utils/api_errors.util.js";
import { ApiResponse } from "../utils/api_response.util.js";
import { JournalEntry } from "../models/journal_entry.model.js";
import { SleepSession } from "../models/sleep_session.model.js";

const createJournalEntry = asyncHandler(async (req, res) => {
    const { sleepSessionId, date, userRating, themes } = req.body;

    if (!sleepSessionId || !date) {
        throw new ApiError(400, "Sleep session ID and date are required");
    }

    if (!mongoose.isValidObjectId(sleepSessionId)) {
        throw new ApiError(400, "Invalid sleep session ID");
    }

    const sleepSession = await SleepSession.findById(sleepSessionId);
    if (!sleepSession || sleepSession.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Associated sleep session not found");
    }

    const journalEntry = await JournalEntry.create({
        sleepSessionId,
        date,
        userRating,
        themes,
        dreamsCount: sleepSession.dreamData?.isDreaming ? 1 : 0, // Example logic
        totalRem: sleepSession.currentStatus?.stage === 'REM' ? sleepSession.currentStatus.stageDuration : 0, // Example
        dominantEmotion: sleepSession.dreamData?.emotion || 'neutral', // Example
        userId: req.user._id,
    });

    if (!journalEntry) {
        throw new ApiError(500, "Something went wrong while creating the journal entry");
    }

    return res.status(201).json(
        new ApiResponse(201, journalEntry, "Journal entry created successfully")
    );
});

const getUserJournalEntries = asyncHandler(async (req, res) => {
    const entries = await JournalEntry.find({ userId: req.user._id }).sort({ date: -1 });

    return res.status(200).json(
        new ApiResponse(200, entries, "User journal entries retrieved successfully")
    );
});

const getJournalEntryById = asyncHandler(async (req, res) => {
    const { journalId } = req.params;

    if (!mongoose.isValidObjectId(journalId)) {
        throw new ApiError(400, "Invalid journal entry ID");
    }

    const entry = await JournalEntry.findById(journalId);

    if (!entry || entry.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Journal entry not found");
    }

    return res.status(200).json(
        new ApiResponse(200, entry, "Journal entry retrieved successfully")
    );
});

const updateJournalEntry = asyncHandler(async (req, res) => {
    const { journalId } = req.params;
    const { userRating, themes } = req.body;

    if (!mongoose.isValidObjectId(journalId)) {
        throw new ApiError(400, "Invalid journal entry ID");
    }

    const entryToUpdate = await JournalEntry.findById(journalId);

    if (!entryToUpdate || entryToUpdate.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Journal entry not found");
    }
    
    if(userRating) entryToUpdate.userRating = userRating;
    if(themes) entryToUpdate.themes = themes;

    const updatedEntry = await entryToUpdate.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, updatedEntry, "Journal entry updated successfully")
    );
});

const deleteJournalEntry = asyncHandler(async (req, res) => {
    const { journalId } = req.params;

    if (!mongoose.isValidObjectId(journalId)) {
        throw new ApiError(400, "Invalid journal entry ID");
    }

    const entryToDelete = await JournalEntry.findById(journalId);

    if (!entryToDelete || entryToDelete.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Journal entry not found");
    }

    await JournalEntry.findByIdAndDelete(journalId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Journal entry deleted successfully")
    );
});

export {
    createJournalEntry,
    getUserJournalEntries,
    getJournalEntryById,
    updateJournalEntry,
    deleteJournalEntry,
};
