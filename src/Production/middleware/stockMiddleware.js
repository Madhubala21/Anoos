import { distributorDbController } from "../../core/database/Controller/distributorDbController.js";
import { productionDbController } from "../../core/database/Controller/productionDBController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
import { PayloadCompiler } from "../../core/inc/access/PayloadCompiler.js";

export class stockMiddleware {}

//shop
stockMiddleware.Stock = {
  selectStock: async () => {
    const fetched = await productionDbController.Stock.selectStock();
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      throw Error.SomethingWentWrong("No FAQ's Found!");
    }
  },
};
