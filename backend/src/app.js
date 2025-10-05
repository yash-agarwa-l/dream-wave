import express from "express";
import { generateImage } from "./controllers/image_generation.controller.js";

const app = express();

app.use(express.json());

app.post("/generate-image", generateImage);

export default app;