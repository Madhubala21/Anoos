import { Router } from "express";
import { Resizer } from "../../core/utils/imageResizer.js";
import { productionAuthenticate } from "../controller/authController.js";
import { stockController } from "../controller/stockController.js";

const stockRouter = Router();

//cart

stockRouter.get(
  "/selectStore",
  productionAuthenticate,
  stockController.Stock.selectStock
);

export { stockRouter };
