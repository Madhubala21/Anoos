import { Router } from "express";
import { adminAuthenticate } from "../controller/auth.Controller.js";
import { stockController } from "../controller/stock.Controller.js";

const stockRouter = Router();

stockRouter.get("/getStock", adminAuthenticate, stockController.Stock.getStock);

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

export { stockRouter };
