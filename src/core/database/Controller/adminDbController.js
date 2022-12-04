import express from "express";
import { connection } from "../connection.js";
import * as Models from "../models/index.js";
import require from "requirejs";
const { Op, Sequelize, where } = require("sequelize");
import * as Error from "../../errors/ErrorConstant.js";

export class adminDbController {}
adminDbController.scope = "defaultScope";
adminDbController.Models = Models;
adminDbController.connection = connection;
adminDbController.defaults = {};

adminDbController.Appconfigs = async () => {
  try {
    return await adminDbController.Models.config.findOne({
      raw: true,
    });
  } catch (error) {}
};

adminDbController.Auth = {
  checkemailExists: async (data) => {
    try {
      return await adminDbController.Models.admin.findOne({
        where: {
          email: data.email,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  checkAdminExistsLogin: async (data) => {
    try {
      return await adminDbController.Models.admin.findOne({
        where: {
          [Op.or]: {
            email: data.userName || null,
            phone: data.userName || null,
          },
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  checkAdminExistsRegister: async (data) => {
    try {
      return await adminDbController.Models.admin.findOne({
        where: {
          [Op.or]: {
            email: data.email || null,
            phone: data.phone || null,
          },
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  checkUserIdExists: async (data) => {
    try {
      return await adminDbController.Models.admin.findOne({
        where: {
          id: data.userId,
          type: "ROOT",
          status: "active",
        },
        attributes: ["id", "username"],
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  createUid: async (data) => {
    const code = Math.floor(100000 + Math.random() * 900000);
    try {
      const updated_data = await adminDbController.Models.customer.update(
        { code: code },
        { where: { id: data.id } },
        { plain: true, returning: true }
      );
      if (updated_data[0] == 1) {
        return adminDbController.Models.customer.findOne({
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
      return await adminDbController.Models.customer.findOne({
        where: { email: data.email, code: data.code },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  updatePassword: async (data) => {
    try {
      return await adminDbController.Models.customer.update(
        {
          password: data.password,
          code: 0,
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
    createSession: async (token, device, id) => {
      try {
        return await adminDbController.Models.adminAuthentication.create({
          uid: id,
          token: token,
          latLong: device.latLong,
          ipv4: device.ip || device.ipv,
          userAgent: device.userAgent,
        });
      } catch (error) {
        throw Error.SomethingWentWrong("Unable to Crate Session");
      }
    },
    findSession: async (token) => {
      try {
        return await adminDbController.Models.adminAuthentication.findOne({
          where: {
            token: token,
          },
          raw: true,
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    },
    findMySession: async (data) => {
      try {
        return await adminDbController.Models.adminAuthentication.findAll({
          where: {
            uid: data.id,
            status: {
              [Op.ne]: "terminate",
            },
          },
          order: [["id", "DESC"]],
          raw: true,
          attributes: {
            exclude: ["token", "uid", "updatedAt"],
          },
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    },
    findSessionId: async (data) => {
      try {
        return await adminDbController.Models.adminAuthentication.findOne({
          where: {
            uid: data.id,
          },
          order: [["id", "DESC"]],
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    },
    findSessionById: async (data) => {
      try {
        return await adminDbController.Models.adminAuthentication.findOne({
          where: {
            id: data.id,
          },
          order: [["id", "DESC"]],
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    },
    destroySession: async (token) => {
      try {
        return await adminDbController.Models.adminAuthentication.update(
          {
            status: "inactive",
          },
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
    deleteSession: async (data) => {
      try {
        return await adminDbController.Models.adminAuthentication.update(
          {
            status: "terminate",
          },
          {
            where: {
              id: data.id,
            },
          }
        );
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    },
  },
};

adminDbController.Admin = {
  createAdmin: async (data) => {
    try {
      return await adminDbController.Models.admin.create(
        {
          email: data.email,
          phone: data.phone,
          password: data.password,
          status: "inactive",
          type: "ROOT",
        },
        { raw: true }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

adminDbController.Users = {
  viewDistributor: async () => {
    try {
      return await adminDbController.Models.banner.findAll({
        order: [["bannerType", "ASC"]],
        raw: true,
        attributes: ["id", "bannerImage", "bannerType", "status"],
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  getDistributor: async () => {
    try {
      return await adminDbController.Models.banner.findAll({
        order: [["bannerType", "ASC"]],
        raw: true,
        attributes: ["id", "bannerImage", "bannerType", "status"],
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  addDistributor: async (data) => {
    try {
      return await adminDbController.Models.banner.create(
        {
          bannerImage: data.bannerImage,
          // bannerText: data.bannerText,
          bannerType: data.bannerType,
          // bannerFor: data.bannerFor,
          // productOrCategoryId: data.productOrCategoryId,
          status: "active",
        },
        { raw: true }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  deleteDistributor: async (data) => {
    try {
      return await adminDbController.Models.faq.findAll({
        where: {
          status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  getProduction: async () => {
    try {
      return await adminDbController.Models.banner.findAll({
        order: [["bannerType", "ASC"]],
        raw: true,
        attributes: ["id", "bannerImage", "bannerType", "status"],
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  viewProduction: async (data) => {
    try {
      return await adminDbController.Models.faq.create(
        {
          title: data.faqTitle,
          answer: data.faqAnswer,
          status: "active",
        },
        { raw: true }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  addProduction: async (data) => {
    try {
      return await adminDbController.Models.faq.update(
        {
          status: data.status,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  deleteProduction: async (data) => {
    try {
      return await adminDbController.Models.banner.update(
        {
          status: data.status,
        },
        {
          where: {
            id: data.bannerId,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

adminDbController.Orders = {
  getDelivery: async () => {
    try {
      return await adminDbController.Models.banner.findAll({
        order: [["bannerType", "ASC"]],
        raw: true,
        attributes: ["id", "bannerImage", "bannerType", "status"],
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  addDelivery: async () => {
    try {
      return await adminDbController.Models.banner.findAll({
        order: [["bannerType", "ASC"]],
        raw: true,
        attributes: ["id", "bannerImage", "bannerType", "status"],
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  editDelivery: async (data) => {
    try {
      return await adminDbController.Models.banner.create(
        {
          bannerImage: data.bannerImage,
          // bannerText: data.bannerText,
          bannerType: data.bannerType,
          // bannerFor: data.bannerFor,
          // productOrCategoryId: data.productOrCategoryId,
          status: "active",
        },
        { raw: true }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  deleteDelivery: async (data) => {
    try {
      return await adminDbController.Models.faq.findAll({
        where: {
          status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

adminDbController.Stock = {
  checkStockExists: async () => {
    try {
      return await adminDbController.Models.banner.findAll({
        order: [["bannerType", "ASC"]],
        raw: true,
        attributes: ["id", "bannerImage", "bannerType", "status"],
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  getStock: async () => {
    try {
      return await adminDbController.Models.banner.findAll({
        order: [["bannerType", "ASC"]],
        raw: true,
        attributes: ["id", "bannerImage", "bannerType", "status"],
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  addStock: async () => {
    try {
      return await adminDbController.Models.banner.findAll({
        order: [["bannerType", "ASC"]],
        raw: true,
        attributes: ["id", "bannerImage", "bannerType", "status"],
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  editStock: async (data) => {
    try {
      return await adminDbController.Models.banner.create(
        {
          bannerImage: data.bannerImage,
          // bannerText: data.bannerText,
          bannerType: data.bannerType,
          // bannerFor: data.bannerFor,
          // productOrCategoryId: data.productOrCategoryId,
          status: "active",
        },
        { raw: true }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  deleteStock: async (data) => {
    try {
      return await adminDbController.Models.faq.findAll({
        where: {
          status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};
