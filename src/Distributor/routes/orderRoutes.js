import { Router } from "express";
import { Resizer } from "../../core/utils/imageResizer.js";
import { DistributorAuthenticate } from "../controller/authController.js";
import { orderController } from "../controller/orderController.js";

const orderRouter = Router();

//cart

orderRouter.get(
  "/viewOrder",
  DistributorAuthenticate,
  orderController.Order.getOrder
);
orderRouter.post(
  "/addOrder",
  DistributorAuthenticate,
  orderController.Order.addOrder
);
orderRouter.post(
  "/updateOrder",
  DistributorAuthenticate,
  orderController.Order.updateOrder
);
orderRouter.post(
  "/deleteOrder",
  DistributorAuthenticate,
  orderController.Order.deleteOrder
);

export { orderRouter };
