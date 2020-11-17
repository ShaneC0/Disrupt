import { Router } from "express";
import { getRepository } from "typeorm";
import { hash, verify } from "argon2";
import { validate } from "class-validator";

import User from "../../entity/User";

const authRouter = Router();

authRouter.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;

  const repository = getRepository(User);

  const createdUser = await repository.create({
    username,
    password,
  });

  const errors = await validate(createdUser);

  if (errors.length > 0) {
    return next(errors);
  } else {
    const existingUser = await repository.findOne({ username });

    if (existingUser) {
      return next(new Error("Username taken"));
    }

    const hashedPassword = await hash(password);

    createdUser.password = hashedPassword;

    await repository.save(createdUser);

    const user = await repository.findOne({ username });

    return res.json({ user });
  }
});

authRouter.post("/signin", async (req, res, next) => {
  const { username, password } = req.body;

  const repository = getRepository(User);

  const existingUser = await repository.findOne({ username });

  if (!existingUser) {
    return next(new Error("Incorrect username or password"));
  }

  if (await verify(existingUser.password, password)) {
    return res.json({ user: existingUser });
  } else {
    return next(new Error("Incorrect username or password"));
  }
});

export default authRouter;
