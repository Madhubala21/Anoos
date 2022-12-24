import { ApplicationResponse } from "../../core/inc/response/ApplicationResponse.js";
import { ApplicationResult } from "../../core/result.js";
import { expenseMiddleware } from "../middleware/expense.Middleware.js";

export class expenseController {}

expenseController.Expense = {
  getExpense: async (req, res) => {
    expenseMiddleware.Expense.getExpense(req)
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

  //   viewAllStock: async (req, res) => {
  //     stockMiddleware.Stock.viewAllStock(req)
  //       .then((data) => {
  //         const response = ApplicationResult.forCreated();
  //         var statuscode = 0;
  //         ApplicationResponse.success(
  //           response,
  //           null,
  //           (response) => (statuscode = response.status)
  //         );
  //         res.json({ status: statuscode, data: data });
  //       })
  //       .catch((error) => {
  //         ApplicationResponse.error(error, null, (response) => {
  //           res.status(response.status).json(response);
  //         });
  //       });
  //   },

  //   addStock: async (req, res) => {
  //     stockMiddleware.Stock.addStock(req)
  //       .then((data) => {
  //         const response = ApplicationResult.forCreated();
  //         var statuscode = 0;
  //         ApplicationResponse.success(
  //           response,
  //           null,
  //           (response) => (statuscode = response.status)
  //         );
  //         res.json({ status: statuscode, data: data });
  //       })
  //       .catch((error) => {
  //         ApplicationResponse.error(error, null, (response) => {
  //           res.status(response.status).json(response);
  //         });
  //       });
  //   },

  //   editStock: async (req, res) => {
  //     stockMiddleware.Stock.editStock(req)
  //       .then((data) => {
  //         const response = ApplicationResult.forCreated();
  //         var statuscode = 0;
  //         ApplicationResponse.success(
  //           response,
  //           null,
  //           (response) => (statuscode = response.status)
  //         );
  //         res.json({ status: statuscode, data: data });
  //       })
  //       .catch((error) => {
  //         ApplicationResponse.error(error, null, (response) => {
  //           res.status(response.status).json(response);
  //         });
  //       });
  //   },

  //   deleteStock: async (req, res) => {
  //     stockMiddleware.Stock.deleteStock(req)
  //       .then((data) => {
  //         const response = ApplicationResult.forCreated();
  //         var statuscode = 0;
  //         ApplicationResponse.success(
  //           response,
  //           null,
  //           (response) => (statuscode = response.status)
  //         );
  //         res.json({ status: statuscode, data: data });
  //       })
  //       .catch((error) => {
  //         ApplicationResponse.error(error, null, (response) => {
  //           res.status(response.status).json(response);
  //         });
  //       });
  //   },
};
