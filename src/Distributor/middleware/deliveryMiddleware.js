import { distributorDbController } from "../../core/database/Controller/distributorDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";

export class DeliveryMiddleware {}

//products
DeliveryMiddleware.Delivery = {
  getDelivery: async ({ token }) => {
    var fetched = await distributorDbController.Delivery.getDelivery(token);
    if (fetched != null && fetched != undefined && fetched != 0) {
      return {
        count: fetched,
      };
    } else {
      return 0;
    }
  },

  addDelivery: async ({ token }) => {
    var fetched = await distributorDbController.Delivery.addDelivery(token);
    if (fetched != null && fetched != undefined && fetched != 0) {
      return {
        count: fetched,
      };
    } else {
      return 0;
    }
  },

  updateDelivery: async ({ token }) => {
    var fetched = await distributorDbController.Delivery.updateDelivery(token);
    if (fetched != null && fetched != undefined && fetched != 0) {
      return {
        count: fetched,
      };
    } else {
      return 0;
    }
  },

  deleteDelivery: async ({ body, token }) => {
    body.customerId = token;
    var destroyed = await distributorDbController.Delivery.deleteDelivery(body);
    if (destroyed[0] != 0) {
      return "Removed From Cart";
    }
  },
};
