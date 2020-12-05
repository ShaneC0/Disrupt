import { Request, Router } from "express";
import { getRepository, ManyToMany } from "typeorm";
import { hash, verify } from "argon2";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";

import User from "../../entity/User";
import Membership from "../../entity/Membership";

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
      return next(new Error("username taken"));
    }

    const hashedPassword = await hash(password);

    createdUser.password = hashedPassword;

    await repository.save(createdUser);

    const user = await repository.findOne({ username });

    jwt.sign(
      {
        username: user.username,
        id: user.id,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 60 * 60 * 24 * 365 * 10,
      },
      (err, token) => {
        if (err) {
          return next(err);
        } else {
          return res.json({ user, token });
        }
      }
    );
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
    jwt.sign(
      {
        username: existingUser.username,
        id: existingUser.id,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 60 * 60 * 24 * 365 * 10,
      },
      (err, token) => {
        if (err) {
          return next(err);
        } else {
          return res.json({ user: existingUser, token });
        }
      }
    );
  } else {
    return next(new Error("Incorrect username or password"));
  }
});

authRouter.get("/authorize", async (req, res, next) => {
  if (req["user"]) {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(req["user"]["id"]);
    delete user.password

    const memberships = await getRepository(Membership)
      .createQueryBuilder("membership")
      .leftJoinAndSelect("membership.server", "server")
      .where("membership.userId = :id", { id: req["user"]["id"] })
      .getMany();

    const servers = memberships.map(membership => membership.server)

    return res.json({ user, servers });

  } else {
    return res.json({ user: null });
  }
});

export default authRouter;
