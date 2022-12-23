import express from "express";
import { connection } from "../connection.js";
import * as Models from "../models/index.js";
import require from "requirejs";
import * as Error from "../../errors/ErrorConstant.js";
import axios from "axios";
import fs from "fs";
import path from "path";
import moment from "moment/moment.js";
// import { defaultAppStore } from "firebase-admin/lib/app/lifecycle.js";
const { Op, Sequelize } = require("sequelize");
export class distributorDbController {}
distributorDbController.scope = "defaultScope";
distributorDbController.Models = Models;
distributorDbController.connection = connection;
distributorDbController.defaults = {};

//user checkexists
distributorDbController.Auth = {
  checkUserExistsDecode: async (data) => {
    try {
      return await distributorDbController.Models.distributor.findOne({
        where: {
          id: data.userId,
          type: data.type,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  checkemailExists: async (data) => {
    try {
      return await distributorDbController.Models.distributor.findOne({
        where: {
          email: data.email,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  checkUserExists: async (data) => {
    try {
      return await distributorDbController.Models.distributor.findOne({
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
  viewDistributorProfile: async (token) => {
    try {
      return await distributorDbController.Models.distributor.findOne({
        where: {
          id: token,
          status: "active",
        },
        attributes: {
          exclude: [
            "id",
            "status",
            "createdAt",
            "updatedAt",
            "password",
            "type",
          ],
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  createUid: async (data) => {
    try {
      const updated_data =
        await distributorDbController.Models.distributor.update(
          { code: data.code, expiry: data.expiry },
          { where: { id: data.id } },
          { plain: true, returning: true }
        );
      if (updated_data[0] == 1) {
        return distributorDbController.Models.distributor.findOne({
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
      return await distributorDbController.Models.distributor.findOne({
        where: { email: data.email, code: data.code },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  verifyUser: async (data) => {
    try {
      return await distributorDbController.Models.distributor.update(
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
      return await distributorDbController.Models.distributor.update(
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
  updateDistributorProfile: async (data, token) => {
    // console.log("data", data);
    // console.log("token", token);
    try {
      const updated = await distributorDbController.Models.distributor.update(
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
      // console.log("updated", updated);
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
  session: {
    createSession: async (token, device) => {
      try {
        return await distributorDbController.Models.distributorAuthentication.create(
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
        return await distributorDbController.Models.distributorAuthentication.findOne(
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
        return await distributorDbController.Models.distributorAuthentication.destroy(
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

distributorDbController.Store = {
  getStore: async (data) => {
    try {
      return await distributorDbController.Models.store.findOne({
        where: {
          id: data.id,
          status: "active",
        },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "status"],
        },
        raw: true,
      });
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },
  getStoreExists: async (data) => {
    // console.log("data", data);
    try {
      return await distributorDbController.Models.store.findOne({
        where: {
          streetName: data.streetName,
          doorNumber: data.doorNumber,
          city: data.city,
        },
        raw: true,
      });
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },
  addStore: async (data, image, id) => {
    try {
      return await distributorDbController.Models.store.create({
        storeId: id,
        image: image,
        name: data.name,
        streetName: data.streetName,
        city: data.city,
        districtName: data.districtName,
        phone: data.phone,
        email: data.email,
        gstNumber: data.gstNumber,
        doorNumber: data.doorNumber,
        pincode: data.pincode,
        paymentMethod: data.paymentMethod,
      });
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },

  updateStore: async (data, image) => {
    console.log("data", data);
    console.log("image", image);
    try {
      const update = await distributorDbController.Models.store.update(
        {
          image: image || data.image,
          name: data.name,
          streetName: data.streetName,
          city: data.city,
          districtName: data.districtName,
          gstNumber: data.gstNumber,
          doorNumber: data.doorNumber,
          pincode: data.pincode,
          paymentMethod: data.paymentMethod,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      if (update[0] != 0) {
        return "Updated successfully";
      } else {
        return "Not updated";
      }
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },

  deleteStore: async (data) => {
    try {
      const update = await distributorDbController.Models.store.update(
        {
          status: "inactive",
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      if (update[0] != 0) {
        return "Store deleted successfully";
      } else {
        return "Not deleted";
      }
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

distributorDbController.Order = {
  getOrder: async (data) => {
    try {
      return await distributorDbController.Models.order.findOne({
        where: {
          storeId: data.storeId,
          status: "active",
        },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "status"],
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  getOrderExists: async (data) => {
    // console.log("data", data);
    try {
      return await distributorDbController.Models.order.findOne({
        where: {
          productName: data.productName,
          quantity: data.quantity,
          amount: data.amount,
          storeId: data.storeId,
        },
        raw: true,
      });
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },

  addOrder: async (data, storeId) => {
    // console.log("data", data);
    try {
      return await distributorDbController.Models.order.create({
        productName: data.productName,
        quantity: data.quantity,
        amount: data.amount,
        storeId: storeId,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  updateOrder: async (data) => {
    try {
      const update = await distributorDbController.Models.order.update(
        {
          productName: data.productName,
          quantity: data.quantity,
          amount: data.amount,
          orderStatus: data.orderStatus,
        },
        {
          where: {
            storeId: data.storeId,
          },
        }
      );
      if (update[0] != 0) {
        return "Order updated successfully";
      } else {
        return "Not deleted";
      }
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  deleteOrder: async (data) => {
    try {
      const update = await distributorDbController.Models.order.update(
        {
          status: "inactive",
        },
        {
          where: {
            storeId: data.storeId,
          },
        }
      );
      if (update[0] != 0) {
        return "Order deleted successfully";
      } else {
        return "Not deleted";
      }
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  // orderDelivery: async (data) => {
  //   try {
  //     const update = await distributorDbController.Models.order.update(
  //       {
  //         orderStatus: data.orderStatus,
  //       },
  //       {
  //         where: {
  //           storeId: data.storeId,
  //         },
  //       }
  //     );
  //     if (update[0] != 0) {
  //       return "Order updated successfully";
  //     } else {
  //       return "Not deleted";
  //     }
  //   } catch (error) {
  //     throw Error.SomethingWentWrong();
  //   }
  // },
};

distributorDbController.Delivery = {
  getDelivery: async (tokenId) => {
    try {
      return await distributorDbController.Models.wishlist.findAll({
        where: {
          customerId: tokenId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  addDelivery: async (data, tokenId) => {
    try {
      return await distributorDbController.Models.wishlist.findOne({
        where: {
          customerId: tokenId,
          productId: data.productId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  updateDelivery: async (data, tokenId) => {
    try {
      return await distributorDbController.Models.wishlist.create({
        customerId: tokenId,
        productId: data.productId,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  deleteDelivery: async (data) => {
    try {
      return await distributorDbController.Models.wishlist.destroy({
        where: {
          productId: data.productId,
          customerId: data.customerId,
          id: data.id,
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

distributorDbController.Expense = {
  getExpense: async (tokenId) => {
    try {
      return await distributorDbController.Models.expense.findOne({
        where: {
          distributorId: tokenId,
        },
        attributes: {
          exclude: ["status", "createdAt", "updatedAt", "id", "distributorId"],
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  distributorExists: async (token) => {
    try {
      return await distributorDbController.Models.distributor.findOne({
        where: {
          id: token,
          status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  addExpense: async (data, token) => {
    try {
      return await distributorDbController.Models.expense.create({
        petrol: data.petrol,
        tea: data.tea,
        food: data.food,
        repair: data.repair,
        others: data.others,
        distributorId: token,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  updateExpense: async (data, token) => {
    try {
      const update = await distributorDbController.Models.expense.update(
        {
          petrol: data.petrol,
          tea: data.tea,
          food: data.food,
          repair: data.repair,
          others: data.others,
        },
        {
          where: {
            distributorId: token,
          },
        }
      );
      if (update[0] != 0) {
        return "Expense updated successfully";
      } else {
        return "Not deleted";
      }
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  deleteExpense: async (data) => {
    try {
      return await distributorDbController.Models.wishlist.destroy({
        where: {
          productId: data.productId,
          customerId: data.customerId,
          id: data.id,
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

distributorDbController.Dashboard = {
  getDashboard: async (tokenId) => {
    try {
      return await distributorDbController.Models.order.findOne({
        where: {
          distributorId: tokenId,
        },
        attributes: {
          exclude: ["status", "createdAt", "updatedAt", "id", "distributorId"],
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  distributorExists: async (token) => {
    try {
      return await distributorDbController.Models.distributor.findOne({
        where: {
          id: token,
          status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  addDashboard: async (data, token) => {
    try {
      return await distributorDbController.Models.order.create({
        petrol: data.petrol,
        tea: data.tea,
        food: data.food,
        repair: data.repair,
        others: data.others,
        distributorId: token,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};
