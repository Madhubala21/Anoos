import { distributorDbController } from "../../core/database/Controller/distributorDbController.js";
import { productionDbController } from "../../core/database/Controller/productionDBController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
import { PayloadCompiler } from "../../core/inc/access/PayloadCompiler.js";

export class orderMiddleware {}

//shop
orderMiddleware.Order = {
  orderDelivery: async ({ body, token }) => {
    const fetched = await productionDbController.Order.orderDelivery(
      body,
      token
    );
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "Order delivery failed";
    }
  },
};
