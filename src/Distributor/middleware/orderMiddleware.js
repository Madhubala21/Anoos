import { distributorDbController } from "../../core/database/Controller/distributorDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";

export class orderMiddleware {}

//products
orderMiddleware.Order = {
  getOrder: async ({ token }) => {
    var fetched = await distributorDbController.Order.getOrder(token);
    if (fetched != null && fetched != undefined && fetched != 0) {
      return {
        count: fetched,
      };
    } else {
      return 0;
    }
  },

  addOrder: async ({ token }) => {
    var fetched = await distributorDbController.Order.addOrder(token);
    if (fetched != null && fetched != undefined && fetched != 0) {
      return {
        count: fetched,
      };
    } else {
      return 0;
    }
  },

  updateOrder: async ({ token }) => {
    var fetched = await distributorDbController.Order.updateOrder(token);
    if (fetched != null && fetched != undefined && fetched != 0) {
      return {
        count: fetched,
      };
    } else {
      return 0;
    }
  },

  deleteOrder: async ({ body, token }) => {
    body.customerId = token;
    var destroyed = await distributorDbController.Order.deleteOrder(body);
    if (destroyed[0] != 0) {
      return "Removed From Cart";
    }
  },
};
