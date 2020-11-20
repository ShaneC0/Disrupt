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

//get a server by its id
serverRouter.get("/details/:id", async (req, res, next) => {
  const { id } = req.params;
  const repository = getRepository(Server);
  const server = await repository.findOne(id);
  if (!server) {
    return next();
  } else {
    return res.json({ server });
  }
});

//get servers where user is a member by user id
serverRouter.get("/member", async (req, res, next) => {
  const { id } = req["user"];
  const repository = getRepository(Membership);
  const memberships = await repository
    .createQueryBuilder("membership")
    .leftJoinAndSelect("membership.server", "server")
    .where("membership.userId = :id", { id })
    .getMany();

  const servers = memberships.map((mem) => mem.server);

  if (!servers) {
    return next();
  } else {
    return res.json({ servers });
  }
});

//get servers where user is owner by user id
serverRouter.get("/owner", async (req, res, next) => {
  const { id } = req["user"];
  const repository = getRepository(Server);

  const servers = await repository
    .createQueryBuilder("server")
    .where("server.ownerId = :id", { id })
    .getMany();

  if (!servers) {
    return next();
  } else {
    return res.json({ servers });
  }
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

      res.json({ success: true });
    } else {
      return next(new Error("Already in this server"));
    }
  }
});

//find all users in a server
serverRouter.get("/users/:id", async (req, res, next) => {
  const { id } = req.params;
  const repository = getRepository(Membership);

  const memberships = await repository
    .createQueryBuilder("membership")
    .leftJoinAndSelect("membership.user", "user")
    .where("membership.serverId = :id", { id })
    .getMany();

  const users = memberships.map((membership) => membership.user);

  res.json({ users });
});

export default serverRouter;
