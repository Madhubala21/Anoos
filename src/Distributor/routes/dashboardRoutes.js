import { Router } from "express";
import { Resizer } from "../../core/utils/imageResizer.js";
import { DistributorAuthenticate } from "../controller/authController.js";
import { dashboardController } from "../controller/dashboardController.js";

const dashboardRouter = Router();

dashboardRouter.get(
  "/viewDashboard",
  DistributorAuthenticate,
  dashboardController.Dashboard.getDashboard
);

dashboardRouter.post(
  "/recentActivities",
  DistributorAuthenticate,
  dashboardController.Dashboard.recentActivities
);

export { dashboardRouter };
