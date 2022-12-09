import require from "requirejs";
var CryptoJS = require("crypto-js");
import { adminDbController } from "../../core/database/Controller/adminDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
import { PayloadCompiler } from "../../core/inc/access/PayloadCompiler.js";

export class allUsersMiddleware {}

allUsersMiddleware.Users = {
  //Distributor

  viewDistributor: async ({ body }) => {
    const fetched = await adminDbController.Users.viewDistributor(body);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "User not found";
    }
  },
  addDistributor: async ({ body }) => {
    const passwordSecret = configs.passwordSecret;
    const fetchDistributor = await adminDbController.Users.getDistributor(body);

    if (
      fetchDistributor != null &&
      fetchDistributor != undefined &&
      Object.keys(fetchDistributor).length != 0
    ) {
      if (
        fetchDistributor.status === "inactive" ||
        fetchDistributor.status === "terminated"
      ) {
        return "Distributor already exists account inactive or terminated";
      } else {
        return "Distributor already exists";
      }
    } else {
      body.password = CryptoJS.AES.encrypt(
        body.password,
        passwordSecret
      ).toString();
      // schema
      const validated = await PayloadCompiler.compile(
        body,
        "distributorCreate"
      );

      const adminCreated = await adminDbController.Users.addDistributor(
        validated.data
      );
      if (
        adminCreated != null &&
        adminCreated != undefined &&
        Object.keys(adminCreated).length != 0
      ) {
        return "Account Created";
      } else {
        return "Error";
      }
    }
  },
  deleteDistributor: async ({ body }) => {
    const updated = await adminDbController.Users.deleteDistributor(body);
    if (updated[0] != 0) {
      return "Order Updated Successfully";
    } else {
      throw Error.SomethingWentWrong("Unable to Change Status");
    }
  },

  //DisaddDistributor

  viewProduction: async ({ body }) => {
    const fetched = await adminDbController.Users.viewProduction(body);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "User not found";
    }
  },
  addProduction: async ({ body }) => {
    const passwordSecret = configs.passwordSecret;
    const fetchProduction = await adminDbController.Users.getProduction(body);

    if (
      fetchProduction != null &&
      fetchProduction != undefined &&
      Object.keys(fetchProduction).length != 0
    ) {
      if (
        fetchProduction.status === "inactive" ||
        fetchProduction.status === "terminated"
      ) {
        return "Production already exists account inactive or terminated";
      } else {
        return "Production already exists";
      }
    } else {
      body.password = CryptoJS.AES.encrypt(
        body.password,
        passwordSecret
      ).toString();
      // schema
      const validated = await PayloadCompiler.compile(body, "productionCreate");

      const adminCreated = await adminDbController.Users.addProduction(
        validated.data
      );
      if (
        adminCreated != null &&
        adminCreated != undefined &&
        Object.keys(adminCreated).length != 0
      ) {
        return "Account Created";
      } else {
        return "Error";
      }
    }
  },
  deleteProduction: async ({ body }) => {
    const updated = await adminDbController.Users.deleteProduction(body);
    if (updated[0] != 0) {
      return "Order Updated Successfully";
    } else {
      throw Error.SomethingWentWrong("Unable to Change Status");
    }
  },
};
