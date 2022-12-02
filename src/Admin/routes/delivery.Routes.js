import { Router } from "express";
import { adminAuthenticate } from "../controller/auth.Controller.js";
import { deliveryController } from "../controller/delivery.Controller.js";

const deliveryRouter = Router();

//orders
deliveryRouter.get(
  "/getDelivery",
  adminAuthenticate,
  deliveryController.Orders.getDelivery
);

deliveryRouter.post(
  "/addDelivery",
  adminAuthenticate,
  deliveryController.Orders.addDelivery
);

deliveryRouter.post(
  "/editDelivery",
  adminAuthenticate,
  deliveryController.Orders.editDelivery
);

deliveryRouter.post(
  "/deleteDelivery",
  adminAuthenticate,
  deliveryController.Orders.deleteDelivery
);

export { deliveryRouter };
