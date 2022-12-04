import { distributorDbController } from "../../core/database/Controller/distributorDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";

export class storeMiddleware {}

//products
storeMiddleware.Store = {
  getStore: async ({ token }) => {
    var fetched = await distributorDbController.Store.getStore(token);
    if (fetched != null && fetched != undefined && fetched != 0) {
      return {
        count: fetched,
      };
    } else {
      return 0;
    }
  },

  addStore: async ({ token }) => {
    var fetched = await distributorDbController.Store.addStore(token);
    if (fetched != null && fetched != undefined && fetched != 0) {
      return {
        count: fetched,
      };
    } else {
      return 0;
    }
  },

  updateStore: async ({ token }) => {
    var fetched = await distributorDbController.Store.updateStore(token);
    if (fetched != null && fetched != undefined && fetched != 0) {
      return {
        count: fetched,
      };
    } else {
      return 0;
    }
  },

  deleteStore: async ({ body, token }) => {
    body.customerId = token;
    var destroyed = await distributorDbController.Store.deleteStore(body);
    if (destroyed[0] != 0) {
      return "Removed From Cart";
    }
  },
};
