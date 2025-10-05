import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRouter } from "./routes/user.routes.js";
import { storyRouter } from "./routes/story.routes.js";
import { gameRouter } from "./routes/game.routes.js";
import { sleepSessionRouter } from "./routes/sleepSession.routes.js";
import { journalEntryRouter } from "./routes/journalEntry.routes.js";
import { gameResultRouter } from "./routes/gameResult.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());


const apiVersion = "/api/v1";

app.use(`${apiVersion}/users`, userRouter);
app.use(`${apiVersion}/stories`, storyRouter);
app.use(`${apiVersion}/games`, gameRouter);
app.use(`${apiVersion}/sleep-sessions`, sleepSessionRouter);
app.use(`${apiVersion}/journal-entries`, journalEntryRouter);
app.use(`${apiVersion}/game-results`, gameResultRouter);


app.get(`${apiVersion}/health`, (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is healthy and running."
    });
});


export { app };
