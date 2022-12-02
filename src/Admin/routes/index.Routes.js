import { Router } from "express";
import { addUsersRouter } from "./addUsers.Routes.js";
import { authRouter } from "./auth.Routes.js";
import { deliveryRouter } from "./delivery.Routes.js";
import { stockRouter } from "./stock.Routes.js";

const adminRouter = Router();

//admin auth
adminRouter.use("/auth", authRouter);

adminRouter.use("/auth", addUsersRouter);

adminRouter.use("/delivery", deliveryRouter);

adminRouter.use("/stock", stockRouter);

export { adminRouter };
