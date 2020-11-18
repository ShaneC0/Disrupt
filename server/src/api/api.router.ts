import { Router } from "express";
import authRouter from "./auth/auth.router";
import { authorize } from "./lib/middleware";
import serverRouter from "./server/server.router";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/server", authorize,serverRouter);

export default apiRouter;
