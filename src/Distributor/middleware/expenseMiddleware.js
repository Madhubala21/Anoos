import { distributorDbController } from "../../core/database/Controller/distributorDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";

export class ExpenseMiddleware {}

//products
ExpenseMiddleware.Expense = {
  getExpense: async ({ token }) => {
    var distributorExists =
      await distributorDbController.Expense.distributorExists(token);
    if (
      distributorExists != null &&
      distributorExists != undefined &&
      distributorExists != 0 &&
      Object.keys(distributorExists).length != 0
    ) {
      var fetched = await distributorDbController.Expense.getExpense(token);
      if (fetched != null && fetched != undefined && fetched != 0) {
        return fetched;
      } else {
        return "Erorr";
      }
    } else {
      return "Distributor not found";
    }
  },

  addExpense: async ({ body, token }) => {
    var distributorExists =
      await distributorDbController.Expense.distributorExists(token);
    if (
      distributorExists != null &&
      distributorExists != undefined &&
      distributorExists != 0
    ) {
      var fetched = await distributorDbController.Expense.addExpense(
        body,
        token
      );
      if (fetched != null && fetched != undefined && fetched != 0) {
        return "Expense added";
      } else {
        return "Failed to add";
      }
    } else {
      return "Distributor not found";
    }
  },

  updateExpense: async ({ body, token }) => {
    var distributorExists =
      await distributorDbController.Expense.distributorExists(token);
    if (
      distributorExists != null &&
      distributorExists != undefined &&
      distributorExists != 0
    ) {
      var updateExpense = await distributorDbController.Expense.updateExpense(
        body,
        token
      );
      if (
        updateExpense != null &&
        updateExpense != undefined &&
        updateExpense != 0
      ) {
        return updateExpense;
      } else {
        return "Failed to add";
      }
    } else {
      return "Distributor not found";
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
