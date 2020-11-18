import { Router } from "express";
import authRouter from "./auth/auth.router"
import serverRouter from "./server/server.router"

const apiRouter = Router();

apiRouter.use('/auth', authRouter)
apiRouter.use('/server', serverRouter)

export default apiRouter;