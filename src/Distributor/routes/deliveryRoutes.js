import { Router } from "express";
import { Resizer } from "../../core/utils/imageResizer.js";
import { DistributorAuthenticate } from "../controller/authController.js";
import { deliveryController } from "../controller/deliveryController.js";
const deliveryRouter = Router();

//cart

deliveryRouter.get(
  "/viewDelivery",
  DistributorAuthenticate,
  deliveryController.Delivery.getDelivery
);
deliveryRouter.post(
  "/addDelivery",
  DistributorAuthenticate,
  deliveryController.Delivery.addDelivery
);
deliveryRouter.post(
  "/updateDelivery",
  DistributorAuthenticate,
  deliveryController.Delivery.updateDelivery
);
deliveryRouter.post(
  "/deleteDelivery",
  DistributorAuthenticate,
  deliveryController.Delivery.deleteDelivery
);

export { deliveryRouter };
