import { Router } from "express";
import { authRouter } from "./authRoutes.js";
import { orderRouter } from "./orderRoutes.js";
import { stockRouter } from "./stockRoutes.js";

const productionRouter = Router();
//authentication

productionRouter.use("/auth", authRouter);

productionRouter.use("/order", orderRouter);

productionRouter.use("/stock", stockRouter);

export { productionRouter };
