import { Router } from "express";
import { Resizer } from "../../core/utils/imageResizer.js";
import { adminAuthenticate } from "../controller/auth.Controller.js";
import { storeController } from "../controller/store.Controller.js";

const storeRouter = Router();

storeRouter.get("/getStore", adminAuthenticate, storeController.Store.getStore);

storeRouter.get(
  "/deleteStore",
  adminAuthenticate,
  storeController.Store.deleteStore
);

storeRouter.post(
  "/editStore",
  adminAuthenticate,
  Resizer,
  storeController.Store.editStore
);

export { storeRouter };
