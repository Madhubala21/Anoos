import { Router } from "express";
import { adminAuthenticate } from "../controller/auth.Controller.js";
import { expenseController } from "../controller/expense.Controller.js";

const expenseRouter = Router();

//orders
expenseRouter.get(
  "/viewExpense",
  adminAuthenticate,
  expenseController.Expense.getExpense
);

// expenseRouter.post(
//   "/addDelivery",
//   adminAuthenticate,
//   expenseController.Expense.addDelivery
// );

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

export { expenseRouter };
