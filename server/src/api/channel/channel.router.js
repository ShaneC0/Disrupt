import { validate } from "class-validator";
import { Router } from "express";
import { getRepository } from "typeorm";

import Channel from "../../entity/Channel"

const channelRouter = Router();

//get all channels
channelRouter.get("/all", async (req, res, next) => {
  const repository = getRepository(Channel);
  const channels = await repository.find();
  return res.json({ channels });
});

//get a channel by its id
channelRouter.get("/details/:id", async (req, res, next) => {
  const { id } = req.body;
  const repository = getRepository(Channel);
  const channel = await repository.findOne(id);
  if (!channel) {
    return next();
  } else {
    return res.json({ channel });
  }
});

export default channelRouter;
