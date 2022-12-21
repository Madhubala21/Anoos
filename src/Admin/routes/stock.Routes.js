import { Router } from "express";
import { adminAuthenticate } from "../controller/auth.Controller.js";
import { stockController } from "../controller/stock.Controller.js";

const stockRouter = Router();

stockRouter.get("/getStock", adminAuthenticate, stockController.Stock.getStock);

stockRouter.get(
  "/viewAllStock",
  adminAuthenticate,
  stockController.Stock.viewAllStock
);

stockRouter.post(
  "/addStock",
  adminAuthenticate,
  stockController.Stock.addStock
);

stockRouter.post(
  "/editStock",
  adminAuthenticate,
  stockController.Stock.editStock
);

stockRouter.post(
  "/deleteStock",
  adminAuthenticate,
  stockController.Stock.deleteStock
);

// stockRouter.post(
//   "/stockLimits",
//   adminAuthenticate,
//   stockController.Stock.stockLimits
// );

stockRouter.get(
  "/stockAlerts",
  adminAuthenticate,
  stockController.Stock.stockAlerts
);

export { stockRouter };
