import path from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";

import express from "express";
import mongoose from "mongoose";

import { Server } from "socket.io";

import { router } from "./router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    const port = 3001;

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      next();
    });

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads")),
    );

    app.use(express.json());
    app.use(router);

    server.listen(3001, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => console.log("Erro ao conectar ao mongodb"));
