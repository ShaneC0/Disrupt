import { validate } from "class-validator";
import { Router } from "express";
import { getRepository } from "typeorm";
import Channel from "../../entity/Channel";

import Message from "../../entity/Message";

const messageRouter = Router();

//get all channels
messageRouter.get("/all", async (req, res, next) => {
  const repository = getRepository(Message);
  const messages = await repository.find();
  return res.json({ messages });
});

//get a channel by its id
messageRouter.get("/details/:id", async (req, res, next) => {
  const { id } = req.params;
  const repository = getRepository(Message);
  const message = await repository.findOne(id);

  if (!message) {
    return next();
  } else {
    return res.json({ message });
  }
});

//get a get a channels messages by channel id and attach user object
messageRouter.get("/channel/:id", async (req, res, next) => {
  const { id } = req.params;
  const repository = getRepository(Message);

  const messages = await repository
    .createQueryBuilder("message")
    .leftJoinAndSelect("message.user", "user")
    .where("message.channelId = :channelId", { channelId: id })
    .getMany();

  return res.json({ messages });
});

//create a message
messageRouter.post("/create", async (req, res, next) => {
  const { text, channelId } = req.body;
  const userId = req["user"]["id"];
  const repository = getRepository(Message);
  const messageToCreate = repository.create({
    text,
    channelId,
    userId,
  });

  const errors = await validate(messageToCreate);
  if (errors.length > 0) {
    return next(errors);
  } else {
    await repository.save(messageToCreate);

    const createdMessage = await repository
      .createQueryBuilder("message")
      .leftJoinAndSelect("message.user", "user")
      .where("message.text = :text", { text })
      .andWhere("message.channelId = :channelId", { channelId })
      .andWhere("message.userId = :userId", { userId })
      .getOne();

    return res.json({ message: createdMessage });
  }
});

//edit a message

//delete a message

export default messageRouter;
