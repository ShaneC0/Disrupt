import { validate } from "class-validator";
import { Router } from "express";
import { getRepository } from "typeorm";
import Channel from "../../entity/Channel";
import Membership from "../../entity/Membership";
import Server from "../../entity/Server";

const serverRouter = Router();

//get all servers
serverRouter.get("/all", async (req, res, next) => {
  const repository = getRepository(Server);
  const servers = await repository.find();
  return res.json({ servers });
});

//Get a server with members, owner, and channels
serverRouter.get("/info/:id", async (req, res, next) => {
  const { id } = req.params;
  const serverRepository = getRepository(Server);
  const membershipRepository = getRepository(Membership);

  const server = await serverRepository
    .createQueryBuilder("server")
    .where("server.id = :id", { id })
    .leftJoinAndSelect("server.owner", "owner")
    .leftJoinAndSelect("server.channels", "channels")
    .getOne();

  const memberships = await membershipRepository
    .createQueryBuilder("membership")
    .where("membership.serverId = :id", { id })
    .leftJoinAndSelect("membership.user", "user")
    .getMany();

  const users = memberships.map(membership => membership.user)

  return res.json({ owner: server.owner, channels: server.channels, users });
});

//create server
serverRouter.post("/create", async (req, res, next) => {
  const { id } = req["user"];
  const { name } = req.body;
  const serverRepository = getRepository(Server);
  const serverToCreate = serverRepository.create({ name, ownerId: id });

  const errors = await validate(serverToCreate);

  if (errors.length > 0) {
    return next(errors);
  } else {
    await serverRepository.save(serverToCreate);
    const createdServer = await serverRepository.findOne(serverToCreate.id);

    const membershipRepository = getRepository(Membership);

    const membershipToCreate = membershipRepository.create({
      userId: id,
      serverId: createdServer.id,
    });

    await membershipRepository.save(membershipToCreate);

    const channelRepository = await getRepository(Channel);

    const channelToCreate = await channelRepository.create({
      name: "General",
      serverId: createdServer.id,
    });

    await channelRepository.save(channelToCreate);

    return res.json({ server: createdServer });
  }
});

//update server
serverRouter.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const repository = getRepository(Server);
  const serverToUpdate = await repository.findOne(id);
  if (!serverToUpdate) {
    return next();
  } else {
    await repository.update(id, { ...serverToUpdate, ...req.body });
    const updatedServer = await repository.findOne(id);
    res.json({ server: updatedServer });
  }
});

//delete server
serverRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const repository = getRepository(Server);
  const serverToDelete = await repository.findOne(id);
  if (!serverToDelete) {
    return next();
  } else {
    await repository.remove(serverToDelete);
    res.json({ success: true });
  }
});

//join a server
serverRouter.post("/join/:id", async (req, res, next) => {
  const userId = req["user"]["id"];
  const serverId = req.params.id;

  const existingServer = await getRepository(Server).findOne(serverId);

  if (!existingServer) {
    return next(new Error("Server doesn't exist"));
  } else {
    const repository = getRepository(Membership);

    const existingMembership = await repository
      .createQueryBuilder("membership")
      .where("membership.userId = :userId", { userId })
      .andWhere("membership.serverId = :serverId", { serverId })
      .getOne();

    if (!existingMembership) {
      const membershipToCreate = repository.create({
        serverId: parseInt(serverId),
        userId,
      });

      await repository.save(membershipToCreate);

      const server = await getRepository(Server).findOne(serverId);

      return res.json({ server });
    } else {
      return next(new Error("Already in this server"));
    }
  }
});

export default serverRouter;
