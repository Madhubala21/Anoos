import { Router } from "express";
import { shopRouter } from "./shop.Routes.js";
import { authRouter } from "./auth.Routes.js";
import { productRouter } from "./product.Routes.js";
import { orderRouter } from "./orderRoutes.js";

const adminRouter = Router();

//admin auth
adminRouter.use("/auth", authRouter);

//shop
adminRouter.use("/shop", storeRouter);

//product
adminRouter.use("/product", productRouter);

//orders
adminRouter.use("/orders", orderRouter);

export { adminRouter };
