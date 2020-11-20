import { validate } from "class-validator";
import { Router } from "express";
import { getRepository } from "typeorm";

import Channel from "../../entity/Channel";
import Server from "../../entity/Server";

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

//get a servers channels by the server id
channelRouter.get("/server/:id", async (req, res, next) => {
  const { id } = req.params;
  const repository = getRepository(Channel);

  const channels = await repository
    .createQueryBuilder("channel")
    .where("channel.serverId = :id", { id })
    .getMany();

  if (!channels) {
    return next();
  } else {
    return res.json({ channels });
  }
});

channelRouter.post("/create", async (req, res, next) => {
  const { name, serverId } = req.body;
  const repository = getRepository(Channel);

  const channelToCreate = repository.create({
    name,
    serverId,
  });

  const errors = await validate(channelToCreate);

  if (errors.length > 0) {
    return next(errors);
  } else {
    await repository.save(channelToCreate);

    const createdChannel = await repository
      .createQueryBuilder("channel")
      .where("channel.name = :name", { name })
      .andWhere("channel.serverId = :serverId", { serverId })
      .getOne()

    res.json({ channel: createdChannel });
  }
});

export default channelRouter;
