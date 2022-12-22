import { ApplicationResponse } from "../../core/inc/response/ApplicationResponse.js";
import { ApplicationResult } from "../../core/result.js";
import { orderMiddleware } from "../middleware/orderMiddleware.js";
import { storeMiddleware } from "../middleware/storeMiddleware.js";

export class orderController {}

orderController.Order = {
  getOrder: async (req, res) => {
    orderMiddleware.Order.getOrder(req)
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

  addOrder: async (req, res) => {
    orderMiddleware.Order.addOrder(req)
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

  updateOrder: async (req, res) => {
    orderMiddleware.Order.updateOrder(req)
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

  deleteOrder: async (req, res) => {
    orderMiddleware.Order.deleteOrder(req)
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

  // orderDelivery: async (req, res) => {
  //   orderMiddleware.Order.orderDelivery(req)
  //     .then((data) => {
  //       const response = ApplicationResult.forCreated();
  //       var statuscode = 0;
  //       ApplicationResponse.success(
  //         response,
  //         null,
  //         (response) => (statuscode = response.status)
  //       );
  //       res.json({ status: statuscode, data: data });
  //     })
  //     .catch((error) => {
  //       ApplicationResponse.error(error, null, (response) => {
  //         res.status(response.status).json(response);
  //       });
  //     });
  // },
};
