import { adminDbController } from "../../core/database/Controller/adminDbController.js";
import { isDataValid, isUpdated } from "../../core/utils/functions.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";

// export class stockMiddleware {}
export class storeMiddleware {}

//category
storeMiddleware.Store = {
  getStore: async ({ body }) => {
    const fetched = await adminDbController.Store.getStore(body);
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

  deleteStore: async ({ body }) => {
    const existingStore = await adminDbController.Store.getStore(body);
    if (
      existingStore != null &&
      existingStore != undefined &&
      Object.keys(existingStore).length != 0
    ) {
      const deleted = await adminDbController.Store.deleteStore(body);
      if (
        deleted != null &&
        deleted != undefined &&
        Object.keys(deleted) != 0
      ) {
        return deleted;
      } else {
        throw Error.SomethingWentWrong("Failed to Deleted Store");
      }
    } else {
      return "Store not found";
    }
  },

  editStore: async ({ body, image }) => {
    const existingStore = await adminDbController.Store.getStore(body);
    if (
      existingStore != null &&
      existingStore != undefined &&
      Object.keys(existingStore).length != 0
    ) {
      const deleted = await adminDbController.Store.updateStore(body, image);
      if (
        deleted != null &&
        deleted != undefined &&
        Object.keys(deleted) != 0
      ) {
        return deleted;
      } else {
        throw Error.SomethingWentWrong("Failed to Deleted Store");
      }
    } else {
      return "Store not found";
    }
  },
};
