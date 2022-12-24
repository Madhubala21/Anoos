import { Router } from "express";
import { Resizer } from "../../core/utils/imageResizer.js";
import { productionAuthenticate } from "../controller/authController.js";
import { orderController } from "../controller/orderController.js";

const orderRouter = Router();

//cart

orderRouter.post(
  "/orderDelivery",
  productionAuthenticate,
  orderController.Order.orderDelivery
);

export { orderRouter };
