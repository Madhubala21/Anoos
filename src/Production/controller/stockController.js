import { ApplicationResult } from "../../core/result.js";
import { ApplicationResponse } from "../../core/inc/response/ApplicationResponse.js";
import { stockMiddleware } from "../middleware/stockMiddleware.js";
export class stockController {}

stockController.Stock = {
  selectStock: async (req, res) => {
    stockMiddleware.Stock.selectStock(req)
      .then((data) => {
        const response = ApplicationResult.forCreated();
        var statuscode = 0;
        ApplicationResponse.success(
          response,
          null,
          (response) => (statuscode = response.status)
        );
        res.json({ status: statuscode, data: data });
      })
      .catch((error) => {
        ApplicationResponse.error(error, null, (response) => {
          res.status(response.status).json(response);
        });
      });
  },
};
