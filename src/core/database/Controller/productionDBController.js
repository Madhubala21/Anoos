import express from "express";
import { connection } from "../connection.js";
import * as Models from "../models/index.js";
import require from "requirejs";
import * as Error from "../../errors/ErrorConstant.js";
const { Op, Sequelize } = require("sequelize");
export class productionDbController {}
productionDbController.scope = "defaultScope";
productionDbController.Models = Models;
productionDbController.connection = connection;
productionDbController.defaults = {};

//user checkexists
productionDbController.Auth = {
  checkemailExists: async (data) => {
    try {
      return await productionDbController.Models.production.findOne({
        where: {
          email: data.email,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  checkUserExistsDecode: async (data) => {
    try {
      return await productionDbController.Models.production.findOne({
        where: {
          id: data.userId,
          type: "PRODUCTION",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  checkUserExists: async (data) => {
    try {
      return await productionDbController.Models.production.findOne({
        where: {
          [Op.or]: {
            email: data.email,
            phone: data.phone,
          },
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  updateProductionProfile: async (data, token) => {
    // console.log("data", data);
    // console.log("token", token);
    try {
      const updated = await productionDbController.Models.production.update(
        {
          username: data.username,
        },
        {
          where: {
            id: token,
            status: "active",
          },
        }
      );
      if (updated[0] != 0) {
        return "Updated successfully";
      } else {
        return "Error in update";
      }
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },
  viewProductionProfile: async (token) => {
    try {
      return await productionDbController.Models.production.findOne({
        where: {
          id: token,
          status: "active",
        },
        attributes: {
          exclude: [
            "id",
            "createdAt",
            "updatedAt",
            "status",
            "type",
            "password",
          ],
        },
      });
    } catch (error) {
      return null;
    }
  },
  createUid: async (data) => {
    try {
      const updated_data =
        await productionDbController.Models.production.update(
          { code: data.code, expiry: data.expiry },
          { where: { id: data.id } },
          { plain: true, returning: true }
        );
      if (updated_data[0] == 1) {
        return productionDbController.Models.production.findOne({
          where: { email: data.email },
          attributes: ["userName", "email", "code"],
          raw: true,
        });
      } else {
        return null;
      }
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  verifyOtp: async (data) => {
    try {
      return await productionDbController.Models.production.findOne({
        where: { email: data.email, code: data.code },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  verifyUser: async (data) => {
    try {
      return await productionDbController.Models.production.update(
        { status: "active", isMailVerified: "yes" },
        {
          where: { id: data.id },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  updatePassword: async (data) => {
    try {
      return await productionDbController.Models.production.update(
        {
          password: data.password,
          code: 0,
          expiry: 0,
        },
        {
          where: { email: data.email },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  session: {
    createSession: async (token, device) => {
      try {
        return await productionDbController.Models.productionAuthentication.create(
          {
            token: token,
            ipv4: device.ip || device.ipv,
            userAgent: device.userAgent,
          }
        );
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    },
    findSession: async (token) => {
      try {
        return await productionDbController.Models.productionAuthentication.findOne(
          {
            where: {
              token: token,
            },
          }
        );
      } catch (error) {
        return null;
      }
    },
    destroySession: async (token) => {
      try {
        return await productionDbController.Models.productionAuthentication.destroy(
          {
            where: {
              token: token,
            },
          }
        );
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    },
  },
};

productionDbController.Stock = {
  selectStock: async (tokenId) => {
    try {
      return await productionDbController.Models.stock.findAll({
        where: {
          productionId: tokenId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

productionDbController.Order = {
  orderDelivery: async (data, token) => {
    try {
      const update = await productionDbController.Models.order.update(
        {
          orderStatus: data.orderStatus,
        },
        {
          where: {
            storeId: data.storeId,
            productionId: token,
          },
        }
      );
      if (update[0] != 0) {
        return "Order updated successfully";
      } else {
        return "Not deleted";
      }
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },
};
