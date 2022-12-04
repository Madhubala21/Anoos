import { distributorDbController } from "../../core/database/Controller/distributorDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";

export class ExpenseMiddleware {}

//products
ExpenseMiddleware.Expense = {
  getExpense: async ({ token }) => {
    var fetched = await distributorDbController.Expense.getExpense(token);
    if (fetched != null && fetched != undefined && fetched != 0) {
      return {
        count: fetched,
      };
    } else {
      return 0;
    }
  },

  addExpense: async ({ token }) => {
    var fetched = await distributorDbController.Expense.addExpense(token);
    if (fetched != null && fetched != undefined && fetched != 0) {
      return {
        count: fetched,
      };
    } else {
      return 0;
    }
  },

  updateExpense: async ({ token }) => {
    var fetched = await distributorDbController.Expense.updateExpense(token);
    if (fetched != null && fetched != undefined && fetched != 0) {
      return {
        count: fetched,
      };
    } else {
      return 0;
    }
  },

  deleteExpense: async ({ body, token }) => {
    body.customerId = token;
    var destroyed = await distributorDbController.Expense.deleteExpense(body);
    if (destroyed[0] != 0) {
      return "Removed From Cart";
    }
  },
};
