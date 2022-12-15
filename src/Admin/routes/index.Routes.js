import { Router } from "express";
import { addUsersRouter } from "./addUsers.Routes.js";
import { authRouter } from "./auth.Routes.js";
import { deliveryRouter } from "./delivery.Routes.js";
import { expenseRouter } from "./expense.Routes.js";
import { orderRouter } from "./order.Routes.js";
import { stockRouter } from "./stock.Routes.js";
import { storeRouter } from "./store.Routes.js";

const adminRouter = Router();

//admin auth
adminRouter.use("/auth", authRouter);

adminRouter.use("/addUser", addUsersRouter);

adminRouter.use("/delivery", deliveryRouter);

adminRouter.use("/stock", stockRouter);

adminRouter.use("/store", storeRouter);

adminRouter.use("/expense", expenseRouter);

adminRouter.use("/order", orderRouter);

export { adminRouter };
