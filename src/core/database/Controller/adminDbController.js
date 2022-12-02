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
          type: "USER",
        },
        { raw: true }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

//shop
adminDbController.Shop = {
  fetchbanners: async () => {
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
  createbanners: async (data) => {
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
  getfaq: async (data) => {
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
  addfaq: async (data) => {
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
  removefaq: async (data) => {
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
  putbanners: async (data) => {
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

  fetchTax: async (data) => {
    if (data.taxId != null && data.taxId != undefined) {
      try {
        return await adminDbController.Models.taxRates.findOne({
          where: {
            id: data.taxId,
            status: "status",
          },
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    } else {
      try {
        return await adminDbController.Models.taxRates.findAll({
          where: {
            status: "active",
          },
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    }
  },
  addTax: async (data) => {
    try {
      return await adminDbController.Models.taxRates.create({
        taxName: data.taxName,
        taxPercentage: data.taxPercentage,
        status: "active",
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  removeTax: async (data) => {
    try {
      return await adminDbController.Models.taxRates.destroy({
        where: {
          id: data.taxId,
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

//customers
adminDbController.Customer = {
  fetchCustomers: async () => {
    // const limit = Number(16);
    try {
      return await adminDbController.Models.customer.findAll({
        attributes: {
          exclude: [
            "alaisName",
            "dob",
            "code",
            "password",
            "fcmToken",
            "createdAt",
            "updatedAt",
            "expiry",
          ],
        },
        order: [["userName", "ASC"]],
        raw: true,
        // limit: 16,
        // offset: 0 + (Number(data.pagination) - 1) * limit
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  // fetchCustomerCount: async () => {
  //   try {
  //     return await adminDbController.Models.customer.count({
  //       raw: true,
  //     })
  //   } catch (error) {
  //     throw Error.SomethingWentWrong();
  //   }
  // },

  getSingleCustomer: async (data) => {
    try {
      return await adminDbController.Models.customer.findOne({
        where: {
          id: data.customerId,
        },
        attributes: {
          exclude: ["code", "password", "fcmToken", "expiry", "updatedAt"],
        },
        // include: { model: [Models.shippingAddress] },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  updateCustomer: async (data) => {
    try {
      return await adminDbController.Models.customer.update(
        {
          status: data.status,
        },

        {
          where: {
            id: data.customerId,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

//category
adminDbController.Category = {
  checkCategoryExists: async (data) => {
    try {
      return await adminDbController.Models.category.findOne({
        where: {
          categoryName: data.categoryName,
          status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  fetchCategoryCount: async () => {
    try {
      return await adminDbController.Models.category.count({
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  fetchCategoryTax: async (data) => {
    try {
      return await adminDbController.Models.category.findOne({
        where: {
          taxId: data.taxId,
          status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  //check product table
  checkProductExistsInCategory: async (data) => {
    try {
      return await adminDbController.Models.product.findOne({
        where: {
          categoryId: data.categoryId,
          // status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  createCategory: async (data) => {
    try {
      return await adminDbController.Models.category.create(
        {
          categoryName: data.categoryName.toLowerCase(),
          categoryImage: data.categoryImage,
          taxId: data.taxId,
          taxPercentage: data.taxPercentage,
          status: "active",
        },
        { raw: true }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  getCategory: async (data) => {
    if (data.categoryId != null && data.categoryId != undefined) {
      try {
        return await adminDbController.Models.category.findOne({
          where: {
            id: data.categoryId,
            status: "active",
          },
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    } else {
      try {
        return await adminDbController.Models.category.findAll({
          raw: true,
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    }
  },
  putCategory: async (data) => {
    try {
      return await adminDbController.Models.category.update(
        {
          categoryName: data.categoryName.toLowerCase(),
          categoryImage: data.categoryImage,
          taxPercentage: data.taxPercentage,
          taxName: data.taxName,
        },
        {
          where: {
            id: data.categoryId,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  destroyCategory: async (data) => {
    try {
      return await adminDbController.Models.category.update(
        {
          status: data.status,
        },
        {
          where: {
            id: data.categoryId,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

//Product
adminDbController.Product = {
  checkProductExists: async (data) => {
    try {
      return await adminDbController.Models.product.findOne({
        where: {
          categoryId: data?.categoryId,
          categoryName: data?.categoryName,
          productName: data?.productName.toLowerCase(),
          // status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  fetchProductCount: async () => {
    try {
      return await adminDbController.Models.product.count({
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  getAllProducts: async (data) => {
    if (data.productId?.trim() && data.productId?.trim() != "null") {
      try {
        return await adminDbController.Models.product.findOne({
          where: {
            id: data.productId,
          },
          raw: true,
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    } else {
      try {
        return await adminDbController.Models.product.findAll({
          raw: true,
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    }
  },
  //check productvariant table
  checkVariantExistsInProduct: async (data) => {
    try {
      return await adminDbController.Models.productVariants.findOne({
        where: {
          productId: data.productId,
          // productName: data.productName,
          // status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  createProduct: async (data) => {
    try {
      return await adminDbController.Models.product.create({
        categoryId: data?.categoryId,
        categoryName: data?.categoryName.toLowerCase(),
        tax: data?.tax,
        productImage: data?.image,
        productName: data?.productName.toLowerCase(),
        productDescription: data?.productDescription,
        moreInfo: data?.moreInfo || "No Info Available",
        tags: data?.tags,
        availableLocations: data?.availableLocations || "asdas",
        status: "active",
      });
    } catch (error) {
      console.log(error);
      throw Error.SomethingWentWrong();
    }
  },
  putProduct: async (data) => {
    try {
      return await adminDbController.Models.product.update(
        {
          productImage: data?.productImage,
          productName: data?.productName.toLowerCase(),
          productDescription: data?.productDescription,
          tags: data?.tags,
          availableLocations: data?.availableLocations,
          status: data?.status,
        },
        {
          where: {
            id: data.productId,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  inactivateProducts: async (data) => {
    try {
      return await adminDbController.Models.product.update(
        {
          status: data?.status,
        },
        {
          where: {
            categoryId: data.categoryId,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  findProductById: async (productId) => {
    try {
      return await adminDbController.Models.product.findOne({
        where: {
          id: productId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  destroyProduct: async (data) => {
    var productId = Number(data.productId);
    try {
      return await adminDbController.Models.product.update(
        {
          status: data.status,
        },
        {
          where: {
            id: productId,
          },
          raw: true,
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  addRecommended: async (data) => {
    try {
      return await adminDbController.Models.recommendedProducts.create({
        productId: data.productId,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getAllRecommended: async (data) => {
    try {
      return await adminDbController.Models.recommendedProducts.findAll();
    } catch (error) {
      throw Error.InternalError();
    }
  },
  deleteRecommended: async (data) => {
    try {
      return await adminDbController.Models.recommendedProducts.destroy({
        where: {
          productId: data.productId,
        },
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchProductArray: async (productIds) => {
    try {
      return await adminDbController.Models.product.findAll({
        where: {
          id: {
            [Op.in]: productIds,
          },

          status: "active",
        },
        raw: true,
        attributes: ["id", "productName", "productImage", "categoryName"],
      });
    } catch (error) {
      console.log(error);
      throw Error.InternalError();
    }
  },
};

//Product variant
adminDbController.Variant = {
  fetchVariants: async (data) => {
    if (data.productId != null && data.productId != undefined) {
      try {
        return await adminDbController.Models.productVariants.findAll({
          where: {
            productId: data.productId,
          },
          raw: true,
          attributes: [
            "id",
            "productName",
            "productId",
            "variantName",
            "status",
            "createdAt",
            "updatedAt",
          ],
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    } else if (data.variantId != null && data.variantId != undefined) {
      try {
        return await adminDbController.Models.productVariants.findOne({
          where: {
            id: data?.variantId,
          },
          raw: true,
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    }
  },
  checkVariantExists: async (data) => {
    try {
      return await adminDbController.Models.productVariants.findOne({
        where: {
          productId: data.productId,
          variantName: data.variantName,
          // status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  checkVariantIdExists: async (data) => {
    try {
      return await adminDbController.Models.productVariants.findOne({
        where: {
          id: data?.variantId,
          // status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  createVariant: async (data) => {
    try {
      return await adminDbController.Models.productVariants.create(
        {
          productId: data?.productId,
          productName: data?.productName?.toLowerCase().trim(),
          variantName: data?.variantName,
          variantImage: data?.variantImage,
          altTags: data?.tags,
          variantColor: data?.variantColor || null,
          isColor: data?.isColor || false,
          actualPrice: data?.actualPrice,
          discountPrice: data?.discountPrice,
          tax: data?.tax,
          status: "active",
        },
        { raw: true }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  putVariant: async (data) => {
    try {
      return await adminDbController.Models.productVariants.update(
        {
          productName: data?.productName.toLowerCase(),
          variantName: data?.variantName.toLowerCase(),
          variantImage: data?.variantImage,
          altTags: data?.tags || null,
          variantColor: data?.variantColor || "[]",
          isColor: data?.isColor,
          actualPrice: data?.actualPrice,
          discountPrice: data?.discountPrice,
        },
        {
          where: {
            id: data.variantId,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  destroyVariant: async (data) => {
    try {
      return await adminDbController.Models.productVariants.update(
        {
          status: data?.status,
        },
        {
          where: {
            id: data?.variantId,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  Stock: {
    fetchStock: async (data) => {
      if (data.productId != null && data.productId != undefined) {
        try {
          return await adminDbController.Models.productVariants.findAll({
            where: {
              productId: data.productId,
            },
            attributes: [
              "id",
              "productId",
              "productName",
              "variantName",
              "variantImage",
              "variantColor",
              "tax",
              "availableStock",
              "alternateStock",
            ],
            raw: true,
          });
        } catch (error) {
          throw Error.SomethingWentWrong();
        }
      } else if (data.variantId != null && data.variantId != undefined) {
        try {
          return await adminDbController.Models.productVariants.findAll({
            where: {
              id: data.variantId,
            },
            attributes: [
              "id",
              "productId",
              "productName",
              "variantName",
              "variantImage",
              "variantColor",
              "tax",
              "availableStock",
              "alternateStock",
            ],
            raw: true,
          });
        } catch (error) {
          throw Error.SomethingWentWrong();
        }
      }
    },
    putStock: async (data) => {
      try {
        return await adminDbController.Models.productVariants.update(
          {
            availableStock: data?.availableStock,
            alternateStock: data?.alternateStock,
          },
          {
            where: {
              id: data.variantId,
            },
          }
        );
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    },
  },
};

//Product Blog
adminDbController.Blog = {
  checkBlogLimit: async (data) => {
    try {
      return await adminDbController.Models.product.findOne({
        where: {
          id: data.productId,
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  getBlog: async (data) => {
    if (data.productId != null && data.productId != undefined) {
      try {
        return await adminDbController.Models.productBlog.findAll({
          where: {
            productId: data.productId,
          },
          raw: true,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    } else {
      try {
        return await adminDbController.Models.productBlog.findAll({
          raw: true,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    }
  },
  createBlog: async (data) => {
    try {
      return await adminDbController.Models.productBlog.create({
        productId: data.productId,
        sectionImage: data.sectionImage,
        status: "active",
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  putBlog: async (data) => {
    try {
      return await adminDbController.Models.productBlog.update(
        {
          status: data.status,
        },
        {
          where: {
            id: data.blogId,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  updateBlog: async (data) => {
    try {
      return await adminDbController.Models.product.update(
        {
          blogLimit: data.blogLimit,
        },
        {
          where: {
            id: data.productId,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

//Product Blog
adminDbController.Specifications = {
  getProductTitles: async (data) => {
    try {
      return await adminDbController.Models.productTitle.findAll({
        where: {
          categoryId: data.categoryId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  checkTitleExists: async (data) => {
    try {
      return await adminDbController.Models.productTitle.findOne({
        where: {
          categoryId: data.categoryId,
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  createProductTitle: async (data) => {
    try {
      return await adminDbController.Models.productTitle.create(
        {
          categoryId: data.categoryId,
          productTitle: data.productTitle,
        },
        {
          raw: true,
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  updateProductTitle: async (data) => {
    try {
      return await adminDbController.Models.productTitle.update(
        {
          productTitle: data.productTitle,
        },
        {
          where: {
            categoryId: data.categoryId,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  deleteTitle: async (data) => {
    try {
      return await adminDbController.Models.productTitle.destroy({
        where: {
          id: data.titleId,
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  //product Specifications
  checkSpecExists: async (data) => {
    try {
      return await adminDbController.Models.productSpecifications.findOne({
        where: {
          productId: data.productId,
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  createProductSpecs: async (data) => {
    try {
      return await adminDbController.Models.productSpecifications.create(
        {
          productId: data.productId,
          productSpecification: data.productSpecification,
        },
        {
          raw: true,
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  updateSpecification: async (data) => {
    try {
      return await adminDbController.Models.productSpecifications.update(
        {
          productSpecification: data.productSpecification,
        },
        {
          where: {
            productId: data.productId,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  deleteSpecification: async (data) => {
    try {
      return await adminDbController.Models.productSpecifications.destroy({
        where: {
          id: data.specificationId,
        },
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};

//Orders
adminDbController.Orders = {
  fetchOrders: async () => {
    try {
      return await adminDbController.Models.orders.findAll({
        where: {
          // customerId: tokenId,
          orderStatus: {
            [Op.ne]: ["pending"],
          },
        },
        order: [["id", "DESC"]],
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  fetchOrderCount: async () => {
    try {
      return await adminDbController.Models.orders.count({
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  getSingleOrders: async (data) => {
    try {
      return await adminDbController.Models.orders.findOne({
        where: {
          orderId: data.orderId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
  changeOrderStatus: async (data) => {
    try {
      return await adminDbController.Models.orders.update(
        {
          orderStatus: data.orderStatus,
        },
        {
          where: {
            orderId: data.orderId,
          },
        }
      );
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },
};
