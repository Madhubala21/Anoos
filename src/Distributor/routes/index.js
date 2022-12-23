import { Router } from "express";
import { authRouter } from "./authRoutes.js";
import { dashboardRouter } from "./dashboardRoutes.js";
import { deliveryRouter } from "./deliveryRoutes.js";
import { expenseRouter } from "./expenseRoutes.js";
import { orderRouter } from "./orderRoutes.js";
import { storeRouter } from "./storeRoutes.js";

const distributorRouter = Router();

//admin auth
distributorRouter.use("/auth", authRouter);

distributorRouter.use("/store", storeRouter);

distributorRouter.use("/order", orderRouter);

distributorRouter.use("/delivery", deliveryRouter);

distributorRouter.use("/expense", expenseRouter);

distributorRouter.use("/dashboard", dashboardRouter);

export { distributorRouter };
