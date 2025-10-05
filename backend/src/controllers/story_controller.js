import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiError } from "../utils/api_errors.util.js";
import { ApiResponse } from "../utils/api_response.util.js";
import { Story } from "../models/story.model.js";

const createStory = asyncHandler(async (req, res) => {
    const { title, content, emotion, genre, duration, theme, journalEntryId } = req.body;

    if (!title || !content) {
        throw new ApiError(400, "Title and content are required");
    }

    const story = await Story.create({
        title,
        content,
        emotion,
        genre,
        duration,
        theme,
        journalEntryId: journalEntryId || null,
        userId: req.user._id,
    });

    if (!story) {
        throw new ApiError(500, "Something went wrong while creating the story");
    }

    return res.status(201).json(
        new ApiResponse(201, story, "Story created successfully")
    );
});

const getUserStories = asyncHandler(async (req, res) => {
    const stories = await Story.find({ userId: req.user._id });

    return res.status(200).json(
        new ApiResponse(200, stories, "User stories retrieved successfully")
    );
});

const getStoryById = asyncHandler(async (req, res) => {
    const { storyId } = req.params;

    if (!mongoose.isValidObjectId(storyId)) {
        throw new ApiError(400, "Invalid story ID");
    }

    const story = await Story.findById(storyId);

    if (!story || story.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Story not found");
    }

    return res.status(200).json(
        new ApiResponse(200, story, "Story retrieved successfully")
    );
});

const updateStory = asyncHandler(async (req, res) => {
    const { storyId } = req.params;
    const { title, content, rating, isCompleted } = req.body;

    if (!mongoose.isValidObjectId(storyId)) {
        throw new ApiError(400, "Invalid story ID");
    }
    
    const storyToUpdate = await Story.findById(storyId);

    if (!storyToUpdate || storyToUpdate.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Story not found");
    }

    const updatedStory = await Story.findByIdAndUpdate(
        storyId,
        {
            $set: {
                title,
                content,
                rating,
                isCompleted,
            },
        },
        { new: true }
    );

    if (!updatedStory) {
        throw new ApiError(500, "Something went wrong while updating the story");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedStory, "Story updated successfully")
    );
});

const deleteStory = asyncHandler(async (req, res) => {
    const { storyId } = req.params;

    if (!mongoose.isValidObjectId(storyId)) {
        throw new ApiError(400, "Invalid story ID");
    }

    const storyToDelete = await Story.findById(storyId);

    if (!storyToDelete || storyToDelete.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "Story not found");
    }

    await Story.findByIdAndDelete(storyId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Story deleted successfully")
    );
});

export {
    createStory,
    getUserStories,
    getStoryById,
    updateStory,
    deleteStory
};
