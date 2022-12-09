import { distributorDbController } from "../../core/database/Controller/distributorDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
import { PayloadCompiler } from "../../core/inc/access/PayloadCompiler.js";

export class storeMiddleware {}

//products
storeMiddleware.Store = {
  getStore: async ({ body }) => {
    var fetched = await distributorDbController.Store.getStore(body);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "Store not found";
    }
  },

  addStore: async (data) => {
    // console.log("data", data);
    const findStore = await distributorDbController.Store.getStoreExists(
      data.body
    );
    if (findStore != null && findStore != undefined && findStore != 0) {
      return "Already exists";
    } else {
      const validated = await PayloadCompiler.compile(data.body, "storeCreate");
      let body = validated.data;
      console.log(body);
      var fetched = await distributorDbController.Store.addStore(
        body,
        data.image
      );
      if (fetched != null && fetched != undefined && fetched != 0) {
        return "Store added successfully";
      } else {
        return "Not added";
      }
    }
  },

  updateStore: async (data) => {
    console.log(data);
    // console.log(data);
    let body = data.body;
    const checkStore = await distributorDbController.Store.getStore(body);
    if (
      checkStore != null &&
      checkStore != undefined &&
      Object.keys(checkStore).length != 0
    ) {
      const fetched = await distributorDbController.Store.updateStore(
        body,
        data.image
      );
      return fetched;
    } else {
      return "Store not found";
    }
  },

  deleteStore: async ({ body }) => {
    const checkStore = await distributorDbController.Store.getStore(body);
    if (
      checkStore != null &&
      checkStore != undefined &&
      Object.keys(checkStore).length != 0
    ) {
      const fetched = await distributorDbController.Store.deleteStore(body);
      return fetched;
    } else {
      return "Store not found";
    }
  },
};
