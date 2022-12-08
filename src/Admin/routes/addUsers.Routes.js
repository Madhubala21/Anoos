import { Router } from "express";
import { allUsersController } from "../controller/addUsers.Controller.js";
import { adminAuthenticate } from "../controller/auth.Controller.js";

const addUsersRouter = Router();

//Distributors

addUsersRouter.post(
  "/viewDistributor",
  adminAuthenticate,
  allUsersController.Users.viewDistributor
);

addUsersRouter.post(
  "/addDistributor",
  adminAuthenticate,
  allUsersController.Users.addDistributor
);

addUsersRouter.post(
  "/deleteDistributor",
  adminAuthenticate,
  allUsersController.Users.deleteDistributor
);

//Production

addUsersRouter.get(
  "/viewProduction",
  adminAuthenticate,
  allUsersController.Users.viewProduction
);

addUsersRouter.post(
  "/addProduction",
  adminAuthenticate,
  allUsersController.Users.addProduction
);

addUsersRouter.post(
  "/deleteProduction",
  adminAuthenticate,
  allUsersController.Users.deleteProduction
);

export { addUsersRouter };
