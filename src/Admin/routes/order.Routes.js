import { Router } from "express";
import { adminAuthenticate } from "../controller/auth.Controller.js";
import { orderController } from "../controller/order.Controller.js";

const orderRouter = Router();

//orders
orderRouter.get(
  "/viewOrder",
  adminAuthenticate,
  orderController.Order.getOrder
);

orderRouter.post(
  "/assignOrder",
  adminAuthenticate,
  orderController.Order.assignOrder
);

// expenseRouter.post(
//   "/editDelivery",
//   adminAuthenticate,
//   expenseController.Expense.editDelivery
// );

// expenseRouter.post(
//   "/deleteDelivery",
//   adminAuthenticate,
//   expenseController.Expense.deleteDelivery
// );
export { orderRouter };
