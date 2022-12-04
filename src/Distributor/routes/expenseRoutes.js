import { Router } from "express";
import { Resizer } from "../../core/utils/imageResizer.js";
import { DistributorAuthenticate } from "../controller/authController.js";
import { expenseController } from "../controller/expenseController.js";

const expenseRouter = Router();

expenseRouter.get(
  "/viewExpense",
  DistributorAuthenticate,
  expenseController.Expense.getExpense
);

expenseRouter.post(
  "/addExpense",
  DistributorAuthenticate,
  expenseController.Expense.addExpense
);

expenseRouter.post(
  "/updateExpense",
  DistributorAuthenticate,
  expenseController.Expense.updateExpense
);

expenseRouter.post(
  "/deleteExpense",
  DistributorAuthenticate,
  expenseController.Expense.deleteExpense
);

export { expenseRouter };
