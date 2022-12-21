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
    console.log("data", data);
    try {
      return await adminDbController.Models.admin.findOne({
        where: {
          email: data.email,
          status: "active",
        },
        raw: true,
      });
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },
  checkAdminExistsLogin: async (data) => {
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
      console.log(error);
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
      // console.log("device", device);
      try {
        return await adminDbController.Models.adminAuthentication.create({
          uid: id,
          token: token,
          latLong: device.latLong,
          ipv4: device.ip || device.ipv,
          userAgent: device.userAgent,
        });
      } catch (error) {
        console.log(error);
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
      console.log("data", data);
      try {
        return await adminDbController.Models.adminAuthentication.findOne({
          where: {
            uid: data.id,
          },
          order: [["id", "DESC"]],
        });
      } catch (error) {
        console.log(error);
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
          username: data.username,
          email: data.email,
          phone: data.phone,
          password: data.password,
          type: "ROOT",
        },
        { raw: true }
      );
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },

  viewAdminProfile: async (token) => {
    try {
      return await adminDbController.Models.admin.findOne(
        {
          where: {
            id: token.id,
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
        },
        { raw: true }
      );
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },
};

adminDbController.Users = {
  viewDistributor: async (data) => {
    try {
      return await adminDbController.Models.distributor.findOne({
        where: {
          id: data.id,
          status: "active",
        },
        attributes: {
          exclude: [
            "id",
            "type",
            "createdAt",
            "updatedAt",
            "status",
            "password",
          ],
        },
      });
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },

  getDistributor: async (data) => {
    try {
      return await adminDbController.Models.distributor.findOne({
        where: {
          [Op.or]: {
            email: data.email || null,
            phone: data.phone || null,
          },
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  addDistributor: async (data) => {
    try {
      return await adminDbController.Models.distributor.create(
        {
          username: data.username,
          email: data.email,
          phone: data.phone,
          password: data.password,
          type: "DISTRIBUTOR",
        },
        { raw: true }
      );
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },

  deleteDistributor: async (data) => {
    try {
      const update = await adminDbController.Models.distributor.update(
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
        return "Deleted successfully";
      } else {
        return "Not updated";
      }
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  getProduction: async (data) => {
    try {
      return await adminDbController.Models.production.findOne({
        where: {
          [Op.or]: {
            email: data.email || null,
            phone: data.phone || null,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },

  viewProduction: async (data) => {
    try {
      return await adminDbController.Models.production.findOne(
        {
          where: {
            id: data.id,
            status: "active",
          },
          attributes: {
            exclude: [
              "id",
              "type",
              "createdAt",
              "updatedAt",
              "status",
              "password",
            ],
          },
        },
        { raw: true }
      );
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },

  addProduction: async (data) => {
    // console.log(data);
    try {
      return await adminDbController.Models.production.create(
        {
          username: data.username,
          email: data.email,
          phone: data.phone,
          password: data.password,
          type: "PRODUCTION",
        },
        { raw: true }
      );
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },

  deleteProduction: async (data) => {
    try {
      const update = await adminDbController.Models.production.update(
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
        return "Deleted successfully";
      } else {
        return "Not updated";
      }
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
  checkStockExists: async (data) => {
    try {
      return await adminDbController.Models.stock.findOne({
        where: {
          stockName: data.stockName,
          status: "active",
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  getStock: async (data) => {
    try {
      return await adminDbController.Models.stock.findOne({
        where: {
          id: data.id,
          status: "active",
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "status"],
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  viewAllStock: async (data) => {
    try {
      return await adminDbController.Models.stock.findAll({
        where: {
          status: "active",
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "status"],
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  addStock: async (data) => {
    try {
      return await adminDbController.Models.stock.create({
        stockName: data.stockName,
        quantity: data.quantity,
        stockLimit: data.stockLimit,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  editStock: async (data) => {
    try {
      const updated = await adminDbController.Models.stock.update(
        {
          stockName: data.stockName,
          quantity: data.quantity,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      if (updated[0] != 0) {
        return "Updated successfully";
      } else {
        return "Error in update";
      }
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  deleteStock: async (data) => {
    try {
      const updated = await adminDbController.Models.stock.update(
        {
          status: "inactive",
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      if (updated[0] != 0) {
        return "Updated successfully";
      } else {
        return "Error in update";
      }
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  // stockLimits: async (data) => {
  //   try {
  //     return await adminDbController.Models.stock.findOne({
  //       where: {
  //         id: data.id,
  //         status: "active",
  //       },
  //       attributes: {
  //         exclude: ["createdAt", "updatedAt", "status"],
  //       },
  //     });
  //   } catch (error) {
  //     throw Error.SomethingWentWrong();
  //   }
  // },

  stockAlerts: async () => {
    try {
      return await adminDbController.Models.stock.findAll({
        where: {
          status: "active",
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "status"],
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

adminDbController.Store = {
  checkStoreExists: async (data) => {
    try {
      return await adminDbController.Models.store.findOne({
        where: {
          stockName: data.stockName,
          status: "active",
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  getStore: async (data) => {
    try {
      return await adminDbController.Models.store.findOne({
        where: {
          id: data.id,
          status: "active",
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "status"],
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  deleteStore: async (data) => {
    try {
      const updated = await adminDbController.Models.store.update(
        {
          status: "inactive",
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      if (updated[0] != 0) {
        return "Store deleted successfully";
      } else {
        return "Error in update";
      }
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  updateStore: async (data, image) => {
    console.log("data", data);
    try {
      const updated = await adminDbController.Models.store.update(
        {
          image: image || data.image,
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
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      if (updated[0] != 0) {
        return "Store updated successfully";
      } else {
        return "Error in update";
      }
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

adminDbController.Expense = {
  checkExpenseExists: async (data) => {
    try {
      return await adminDbController.Models.expense.findOne({
        where: {
          distributorId: data.id,
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  getExpense: async (data) => {
    try {
      return await adminDbController.Models.expense.findOne({
        where: {
          distributorId: data.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "status", "id", "distributorId"],
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  // deleteStore: async (data) => {
  //   try {
  //     const updated = await adminDbController.Models.store.update(
  //       {
  //         status: "inactive",
  //       },
  //       {
  //         where: {
  //           id: data.id,
  //         },
  //       }
  //     );
  //     if (updated[0] != 0) {
  //       return "Store deleted successfully";
  //     } else {
  //       return "Error in update";
  //     }
  //   } catch (error) {
  //     throw Error.SomethingWentWrong();
  //   }
  // },

  // updateStore: async (data, image) => {
  //   console.log("data", data);
  //   try {
  //     const updated = await adminDbController.Models.store.update(
  //       {
  //         image: image || data.image,
  //         name: data.name,
  //         streetName: data.streetName,
  //         city: data.city,
  //         districtName: data.districtName,
  //         phone: data.phone,
  //         email: data.email,
  //         gstNumber: data.gstNumber,
  //         doorNumber: data.doorNumber,
  //         pincode: data.pincode,
  //         paymentMethod: data.paymentMethod,
  //       },
  //       {
  //         where: {
  //           id: data.id,
  //         },
  //       }
  //     );
  //     if (updated[0] != 0) {
  //       return "Store updated successfully";
  //     } else {
  //       return "Error in update";
  //     }
  //   } catch (error) {
  //     throw Error.SomethingWentWrong();
  //   }
  // },
};

adminDbController.Order = {
  checkOrderExists: async (data) => {
    try {
      return await adminDbController.Models.expense.findOne({
        where: {
          distributorId: data.id,
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  fetchOrder: async (data) => {
    try {
      return await adminDbController.Models.order.findOne({
        where: {
          storeId: data.storeId,
          productionId: data.productionId,
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  getOrder: async (data) => {
    try {
      let fetchOrder = await adminDbController.Models.order.findOne({
        where: {
          storeId: data.storeId,
        },
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "status",
            "storeId",
            "orderStatus",
          ],
        },
      });
      if (fetchOrder.productionId == null) {
        fetchOrder.productionId = "Order not assigned";
      } else {
        fetchOrder = fetchOrder;
      }
      return fetchOrder;
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },

  assignOrder: async (data) => {
    try {
      const updated = await adminDbController.Models.order.update(
        {
          productionId: data.productionId,
        },
        {
          where: {
            storeId: data.storeId,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "status", "storeId"],
          },
        }
      );
      if (updated[0] != 0) {
        return "Order assigned successfully";
      } else {
        return "Failed to assign order";
      }
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  // deleteStore: async (data) => {
  //   try {
  //     const updated = await adminDbController.Models.store.update(
  //       {
  //         status: "inactive",
  //       },
  //       {
  //         where: {
  //           id: data.id,
  //         },
  //       }
  //     );
  //     if (updated[0] != 0) {
  //       return "Store deleted successfully";
  //     } else {
  //       return "Error in update";
  //     }
  //   } catch (error) {
  //     throw Error.SomethingWentWrong();
  //   }
  // },

  // updateStore: async (data, image) => {
  //   console.log("data", data);
  //   try {
  //     const updated = await adminDbController.Models.store.update(
  //       {
  //         image: image || data.image,
  //         name: data.name,
  //         streetName: data.streetName,
  //         city: data.city,
  //         districtName: data.districtName,
  //         phone: data.phone,
  //         email: data.email,
  //         gstNumber: data.gstNumber,
  //         doorNumber: data.doorNumber,
  //         pincode: data.pincode,
  //         paymentMethod: data.paymentMethod,
  //       },
  //       {
  //         where: {
  //           id: data.id,
  //         },
  //       }
  //     );
  //     if (updated[0] != 0) {
  //       return "Store updated successfully";
  //     } else {
  //       return "Error in update";
  //     }
  //   } catch (error) {
  //     throw Error.SomethingWentWrong();
  //   }
  // },
};
