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
  getStore: async (tokenId) => {
    try {
      return await distributorDbController.Models.wishlist.findAll({
        where: {
          distributorId: tokenId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  addStore: async (data, tokenId) => {
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

  updateStore: async (data, tokenId) => {
    try {
      return await distributorDbController.Models.wishlist.create({
        customerId: tokenId,
        productId: data.productId,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  deleteStore: async (data) => {
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

distributorDbController.Order = {
  getOrder: async (tokenId) => {
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
  addOrder: async (data, tokenId) => {
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

  updateOrder: async (data, tokenId) => {
    try {
      return await distributorDbController.Models.wishlist.create({
        customerId: tokenId,
        productId: data.productId,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  deleteOrder: async (data) => {
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
  addExpense: async (data, tokenId) => {
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

  updateExpense: async (data, tokenId) => {
    try {
      return await distributorDbController.Models.wishlist.create({
        customerId: tokenId,
        productId: data.productId,
      });
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
