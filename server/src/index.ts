import "reflect-metadata";
import {createConnection} from "typeorm";
import Express from "express"

const app = Express()

app.listen(process.env.PORT, async () => {
    const connection = await createConnection();
  
    if (connection.isConnected) {
      console.log("Connected to Postgres");
    }
  
    console.log(`Express server listening on http://localhost:${process.env.PORT}/`);
  });