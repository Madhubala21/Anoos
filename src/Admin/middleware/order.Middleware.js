import { adminDbController } from "../../core/database/Controller/adminDbController.js";
import { isDataValid, isUpdated } from "../../core/utils/functions.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";

export class orderMiddleware {}

//category
orderMiddleware.Order = {
  getOrder: async ({ body }) => {
    const fetched = await adminDbController.Order.getOrder(body);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "Order not found";
    }
  },

  assignOrder: async ({ body }) => {
    const fetchedOrder = await adminDbController.Order.fetchOrder(body);
    console.log("fetchedOrder", fetchedOrder);
    if (
      fetchedOrder != null &&
      fetchedOrder != undefined &&
      Object.keys(fetchedOrder).length != 0
    ) {
      return "Order already assigned";
    } else {
      const fetched = await adminDbController.Order.assignOrder(body);
      if (
        fetched != null &&
        fetched != undefined &&
        Object.keys(fetched).length != 0
      ) {
        return fetched;
      } else {
        return "Order not found";
      }
    }
  },
  //   viewAllStock: async () => {
  //     const fetched = await adminDbController.Stock.viewAllStock();
  //     if (
  //       fetched != null &&
  //       fetched != undefined &&
  //       Object.keys(fetched).length != 0
  //     ) {
  //       return fetched;
  //     } else {
  //       return "Stock not found";
  //     }
  //   },

  //   addStock: async ({ body }) => {
  //     const existingCategory = await adminDbController.Stock.checkStockExists(
  //       body
  //     );
  //     if (
  //       existingCategory != null &&
  //       existingCategory != undefined &&
  //       Object.keys(existingCategory).length != 0
  //     ) {
  //       return "Stock Already Exists";
  //     } else {
  //       const created = await adminDbController.Stock.addStock(body);
  //       if (
  //         created != null &&
  //         created != undefined &&
  //         Object.keys(created) != 0
  //       ) {
  //         return "Stock Created Successfully";
  //       } else {
  //         throw Error.SomethingWentWrong("Failed to Create Category");
  //       }
  //     }
  //   },

  //   editStock: async ({ body }) => {
  //     const checkStockExists = await adminDbController.Stock.getStock(body);
  //     if (
  //       checkStockExists != null &&
  //       checkStockExists != undefined &&
  //       Object.keys(checkStockExists).length != 0
  //     ) {
  //       const updated = await adminDbController.Stock.editStock(body);
  //       if (updated[0] != 0) {
  //         return updated;
  //       } else {
  //         return "Update Failed";
  //       }
  //     } else {
  //       return "Stock not found";
  //     }
  //   },

  //   deleteStock: async ({ body }) => {
  //     body.categoryImage = image;
  //     const existingCategory = await adminDbController.Stock.checkStockExists(
  //       body
  //     );
  //     if (
  //       existingCategory != null &&
  //       existingCategory != undefined &&
  //       Object.keys(existingCategory).length != 0
  //     ) {
  //       return "Category Already Exists";
  //     } else {
  //       const created = await adminDbController.Stock.deleteStock(body);
  //       if (
  //         created != null &&
  //         created != undefined &&
  //         Object.keys(created) != 0
  //       ) {
  //         return "Category Created Successfully";
  //       } else {
  //         throw Error.SomethingWentWrong("Failed to Create Category");
  //       }
  //     }
  //   },
};
