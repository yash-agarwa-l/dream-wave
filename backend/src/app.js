import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

import { userRouter, storyRouter, gameResultRouter, gameRouter, journalEntryRouter, sleepSessionRouter, imageRouter } from "./routes.js";


const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN || "*",
//     credentials: true
// }));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(cookieParser());


const apiVersion = "/api/v1";

app.use(`${apiVersion}/users`, userRouter);
app.use(`${apiVersion}/stories`, storyRouter);
app.use(`${apiVersion}/games`, gameRouter);
app.use(`${apiVersion}/sleep-sessions`, sleepSessionRouter);
app.use(`${apiVersion}/journal-entries`, journalEntryRouter);
app.use(`${apiVersion}/game-results`, gameResultRouter);
app.use(`${apiVersion}/image`, imageRouter);


app.get(`${apiVersion}/health`, (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is healthy and running."
    });
});


export default app;
