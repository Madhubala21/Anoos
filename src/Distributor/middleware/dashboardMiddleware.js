import { distributorDbController } from "../../core/database/Controller/distributorDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
import { PayloadCompiler } from "../../core/inc/access/PayloadCompiler.js";

export class dashboardMiddleware {}

//products
dashboardMiddleware.Dashboard = {
  fetchDashboard: async ({ token }) => {
    const delivered = await distributorDbController.Dashboard.fetchDelivered();
    const upcoming = await distributorDbController.Dashboard.fetchUpcoming();
    const attendance =
      await distributorDbController.Dashboard.fetchAttendance();
    const expences = await distributorDbController.Dashboard.fetchExpences(
      token
    );
    const newOrders = await distributorDbController.Dashboard.fetchNewOrders();
    const revenue = await distributorDbController.Dashboard.fetchRevenue();
    // console.log("delivered", delivered);
    // console.log("upcoming", upcoming);
    // console.log("attendance", attendance);
    // console.log("expences", expences);
    // console.log("newOrders", newOrders);
    // console.log("revenue", revenue);
    let allCount = {
      delivered: delivered,
      upcoming: upcoming,
      attendance: attendance,
      expences: expences,
      newOrders: newOrders,
      revenue: revenue,
    };
    return allCount;
  },

  addDashboard: async ({ body }) => {
    let storeId = body.storeId;
    const findDashboard =
      await distributorDbController.Dashboard.getOrderExists(body);
    if (
      findOrder != null &&
      findOrder != undefined &&
      Object.keys(findOrder).length != 0
    ) {
      return "Already exists";
    } else {
      const validated = await PayloadCompiler.compile(body, "orderCreate");
      let data = validated.data;
      // console.log("body", data);
      // console.log("body.storeId", storeId);
      var fetched = await distributorDbController.Dashboard.addDashboard(
        data,
        storeId
      );
      if (fetched != null && fetched != undefined && fetched != 0) {
        return "Order added successfully";
      } else {
        return "Not added";
      }
    }
  },
};
