import "reflect-metadata";
import { createConnection } from "typeorm";
import Express from "express";
import morgan from "morgan"

import apiRouter from "./api/api.router";

const app = Express();

app.use(Express.json());

app.use(morgan('tiny'))

app.use("/api/v1", apiRouter);

app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Not found - ${req.originalUrl}`));
});

app.use((err, req, res, next) => {
  let validationErrors = (errors) => {
    if (Array.isArray(errors)) {
      return errors.map((error) => {
        for (err in error.constraints) {
          return error.constraints[err];
        }
      });
    } else {
      return null;
    }
  };

  res.status(500);
  res.json({
    message: err.message,
    stack: err.stack,
    validationErrors: validationErrors(err),
  });
});

app.listen(process.env.PORT, async () => {
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
