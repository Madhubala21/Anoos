import { ApplicationResponse } from "../../core/inc/response/ApplicationResponse.js";
import { ApplicationResult } from "../../core/result.js";
import { dashboardMiddleware } from "../middleware/dashboardMiddleware.js";

export class dashboardController {}

dashboardController.Dashboard = {
  getDashboard: async (req, res) => {
    dashboardMiddleware.Dashboard.fetchDashboard(req)
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

  recentActivities: async (req, res) => {
    dashboardMiddleware.Dashboard.recentActivities(req)
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
