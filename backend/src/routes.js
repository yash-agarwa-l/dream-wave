import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { createStory, getUserStories, getStoryById, updateStory, deleteStory } from "../controllers/story.controller.js";
import { createGame, getUserGames, getGameById, updateGame, deleteGame } from "../controllers/game.controller.js";
import { createSleepSession, getUserSleepSessions, getSleepSessionById, updateSleepSession, deleteSleepSession } from "../controllers/sleep_session.controller.js";
import { createJournalEntry, getUserJournalEntries, getJournalEntryById, updateJournalEntry, deleteJournalEntry } from "../controllers/journal_entry.controller.js";
import { createGameResult, getGameResultsForUser, getGameResultsByGame, getGameResultById, deleteGameResult } from "../controllers/game_result.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

export const userRouter = Router();
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);


export const storyRouter = Router();
gameRouter.use(verifyJWT);
storyRouter.route("/").post(createStory).get(getUserStories);
storyRouter.route("/:storyId").get(getStoryById).patch(updateStory).delete(deleteStory);

export const gameRouter = Router();
gameRouter.use(verifyJWT);
gameRouter.route("/").post(createGame).get(getUserGames);
gameRouter.route("/:gameId").get(getGameById).patch(updateGame).delete(deleteGame);


export const sleepSessionRouter = Router();
sleepSessionRouter.use(verifyJWT);
sleepSessionRouter.route("/").post(createSleepSession).get(getUserSleepSessions);
sleepSessionRouter.route("/:sessionId").get(getSleepSessionById).patch(updateSleepSession).delete(deleteSleepSession);

export const journalEntryRouter = Router();
journalEntryRouter.use(verifyJWT);
journalEntryRouter.route("/").post(createJournalEntry).get(getUserJournalEntries);
journalEntryRouter.route("/:journalId").get(getJournalEntryById).patch(updateJournalEntry).delete(deleteJournalEntry);


export const gameResultRouter = Router();
gameResultRouter.use(verifyJWT);
gameResultRouter.route("/").post(createGameResult).get(getGameResultsForUser);
gameResultRouter.route("/game/:gameId").get(getGameResultsByGame);
gameResultRouter.route("/:resultId").get(getGameResultById).delete(deleteGameResult);


