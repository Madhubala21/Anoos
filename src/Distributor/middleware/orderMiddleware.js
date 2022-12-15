import { distributorDbController } from "../../core/database/Controller/distributorDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
import { PayloadCompiler } from "../../core/inc/access/PayloadCompiler.js";

export class orderMiddleware {}

//products
orderMiddleware.Order = {
  getOrder: async ({ body }) => {
    var fetched = await distributorDbController.Order.getOrder(body);
    if (fetched != null && fetched != undefined && fetched != 0) {
      return fetched;
    } else {
      return "Order not found";
    }
  },

  addOrder: async ({ body }) => {
    let storeId = body.storeId;
    const findOrder = await distributorDbController.Order.getOrderExists(body);
    if (
      findOrder != null &&
      findOrder != undefined &&
      Object.keys(findOrder).length != 0
    ) {
      return "Already exists";
    } else {
      const validated = await PayloadCompiler.compile(body, "orderCreate");
      let data = validated.data;
      // console.log("body", data);
      // console.log("body.storeId", storeId);
      var fetched = await distributorDbController.Order.addOrder(data, storeId);
      if (fetched != null && fetched != undefined && fetched != 0) {
        return "Order added successfully";
      } else {
        return "Not added";
      }
    }
  },

  updateOrder: async ({ body }) => {
    const findOrder = await distributorDbController.Order.getOrder(body);
    if (
      findOrder != null &&
      findOrder != undefined &&
      Object.keys(findOrder).length != 0
    ) {
      var fetched = await distributorDbController.Order.updateOrder(body);
      if (fetched != null && fetched != undefined && fetched != 0) {
        return fetched;
      } else {
        return "Order not updatedd";
      }
    } else {
      return "Order not found";
    }
  },

  deleteOrder: async ({ body }) => {
    const findOrder = await distributorDbController.Order.getOrder(body);
    if (
      findOrder != null &&
      findOrder != undefined &&
      Object.keys(findOrder).length != 0
    ) {
      var fetched = await distributorDbController.Order.deleteOrder(body);
      if (fetched != null && fetched != undefined && fetched != 0) {
        return fetched;
      } else {
        return "Order deleted";
      }
    } else {
      return "Order not found";
    }
  },
};
