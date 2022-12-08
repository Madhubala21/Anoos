import { adminDbController } from "../../core/database/Controller/adminDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";

export class allUsersMiddleware {}

allUsersMiddleware.Users = {
  //Distributor

  viewDistributor: async ({ body }) => {
    const fetched = await adminDbController.Users.viewDistributor(body);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "No Users Found";
    }
  },
  addDistributor: async ({ body }) => {
    const fetchDistributor = await adminDbController.Users.getDistributor(body);
    if (
      fetchDistributor != null &&
      fetchDistributor != undefined &&
      Object.keys(fetchDistributor).length != 0
    ) {
      return "Distributor already exists";
    } else {
      const fetched = await adminDbController.Users.addDistributor(body);
      if (
        fetched != null &&
        fetched != undefined &&
        Object.keys(fetched).length != 0
      ) {
        return "Added successfully";
      } else {
        return "Error";
      }
    }
  },
  deleteDistributor: async ({ body }) => {
    const updated = await adminDbController.Users.deleteDistributor(body);
    if (updated[0] != 0) {
      return "Order Updated Successfully";
    } else {
      throw Error.SomethingWentWrong("Unable to Change Status");
    }
  },

  //Production

  viewProduction: async () => {
    const fetched = await adminDbController.Users.viewProduction();
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "No Users Found";
    }
  },
  addProduction: async ({ body }) => {
    const fetchOrder = await adminDbController.Users.getProduction(body);
    fetchOrder.cartId = JSON.parse(fetchOrder.cartId);
    fetchOrder.customerId = fetchOrder.customerId;
    fetchOrder.shippingAddress = fetchOrder.shippingAddres;

    const fetchCart = await adminDbController.Users.addProduction(
      fetchOrder.cartId
    );

    return fetchCart;
  },
  deleteProduction: async ({ body }) => {
    const updated = await adminDbController.Users.deleteProduction(body);
    if (updated[0] != 0) {
      return "Order Updated Successfully";
    } else {
      throw Error.SomethingWentWrong("Unable to Change Status");
    }
  },
};
