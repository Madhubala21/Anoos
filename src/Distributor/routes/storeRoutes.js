import { Router } from "express";
import { Resizer } from "../../core/utils/imageResizer.js";
import { DistributorAuthenticate } from "../controller/authController.js";
import { storeController } from "../controller/storeController.js";

const storeRouter = Router();

//cart

storeRouter.get(
  "/viewStore",
  DistributorAuthenticate,
  storeController.Store.getStore
);
storeRouter.post(
  "/addStore",
  DistributorAuthenticate,
  storeController.Store.addStore
);
storeRouter.post(
  "/updateStore",
  DistributorAuthenticate,
  storeController.Store.updateStore
);
storeRouter.post(
  "/deleteStore",
  DistributorAuthenticate,
  storeController.Store.deleteStore
);

export { storeRouter };
