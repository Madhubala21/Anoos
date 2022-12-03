import { Router } from "express";
import { authRouter } from "./authRoutes.js";
import { stockRouter } from "./stockRoutes.js";

const productionRouter = Router();
//authentication

productionRouter.use("/auth", authRouter);

productionRouter.use("/stock", stockRouter);

export { productionRouter };
