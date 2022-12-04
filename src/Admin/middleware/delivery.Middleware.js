import { adminDbController } from "../../core/database/Controller/adminDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";

export class deliveryMiddleware {}

deliveryMiddleware.Order = {
  getDelivery: async () => {
    const fetched = await adminDbController.Orders.getDelivery();
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "No Orders Found";
    }
  },
  addDelivery: async ({ body }) => {
    const updated = await adminDbController.Orders.addDelivery(body);
    if (updated[0] != 0) {
      return "Order Updated Successfully";
    } else {
      throw Error.SomethingWentWrong("Unable to Change Status");
    }
  },
  editDelivery: async ({ body }) => {
    const updated = await adminDbController.Orders.editDelivery(body);
    if (updated[0] != 0) {
      return "Order Updated Successfully";
    } else {
      throw Error.SomethingWentWrong("Unable to Change Status");
    }
  },
  deleteDelivery: async ({ body }) => {
    const updated = await adminDbController.Orders.deleteDelivery(body);
    if (updated[0] != 0) {
      return "Order Updated Successfully";
    } else {
      throw Error.SomethingWentWrong("Unable to Change Status");
    }
  },
};
