import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"


import {
  checkTokenSetUser,
  errorHandler,
  notFound,
} from "./api/lib/middleware";
import apiRouter from "./api/api.router";

const app: express.Application = express();
const server = createServer(app)
const io = new Server(server)

io.on("connection", socket => {
  socket.on('message', data => {
    socket.broadcast.emit('message', data)
  })

  socket.on('new-channel', data => {
    socket.broadcast.emit('new-channel', data)
  })
})

app.use(cors({
  origin: "*"
}))

app.use(express.json());

app.use(morgan("tiny"));

app.use("/api/v1", checkTokenSetUser, apiRouter);

app.use(notFound);

app.use(errorHandler);

server.listen(process.env.PORT, async () => {
  const connection = await createConnection();

  if (connection.isConnected) {
    console.log(
      "Connected to Postgres at @postgresql://[username]:[password]@localhost:5432/disrupt"
    );
  }

  console.log(
    `Express server listening on http://localhost:${process.env.PORT}/`
  );
});
