import { adminDbController } from "../../core/database/Controller/adminDbController.js";
import { isDataValid, isUpdated } from "../../core/utils/functions.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";

export class stockMiddleware {}

//category
stockMiddleware.Stock = {
  getStock: async ({ query }) => {
    const fetched = await adminDbController.Stock.getStock(query);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "No Categories Found";
    }
  },

  addStock: async ({ body, image }) => {
    body.categoryImage = image;
    const existingCategory = await adminDbController.Stock.checkStockExists(
      body
    );
    if (
      existingCategory != null &&
      existingCategory != undefined &&
      Object.keys(existingCategory).length != 0
    ) {
      return "Category Already Exists";
    } else {
      const created = await adminDbController.Stock.addStock(body);
      if (
        created != null &&
        created != undefined &&
        Object.keys(created) != 0
      ) {
        return "Category Created Successfully";
      } else {
        throw Error.SomethingWentWrong("Failed to Create Category");
      }
    }
  },

  editStock: async ({ body, image }) => {
    if (
      checkproduct != null &&
      checkproduct != undefined &&
      Object.keys(checkproduct).length != 0
    ) {
      const updated = await adminDbController.Stock.editStock(body);
      if (updated[0] != 0) {
        return "Update Success";
      } else {
        return "Update Failed";
      }
    } else {
      return "Update Success";
    }
  },

  deleteStock: async ({ body, image }) => {
    body.categoryImage = image;
    const existingCategory = await adminDbController.Stock.checkStockExists(
      body
    );
    if (
      existingCategory != null &&
      existingCategory != undefined &&
      Object.keys(existingCategory).length != 0
    ) {
      return "Category Already Exists";
    } else {
      const created = await adminDbController.Stock.deleteStock(body);
      if (
        created != null &&
        created != undefined &&
        Object.keys(created) != 0
      ) {
        return "Category Created Successfully";
      } else {
        throw Error.SomethingWentWrong("Failed to Create Category");
      }
    }
  },
};
