import { ApplicationResponse } from "../../core/inc/response/ApplicationResponse.js";
import { ApplicationResult } from "../../core/result.js";
import { productMiddleware } from "../middleware/productMiddleware.js";

export class ProductController {}

ProductController.Product = {
  /**
   * @name get All Product with filters
   * @param {*} token
   */

  getFilters: async (req, res) => {
    productMiddleware.Product.fetchFilterProduct(req)
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
  /**
   * @name get Product Specifications
   * @param {*} token
   */
  getSpecs: async (req, res) => {
    productMiddleware.Product.fetchSpecs(req)
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
  /**
   * @name get recommended Product
   * @param {*} token
   */
  getRecommended: async (req, res) => {
    productMiddleware.Product.fetchRecommended(req)
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

ProductController.Variant = {
  /**
   * @name get single product variants with wishlist
   * @param {*} token
   */

  getVariant: async (req, res) => {
    productMiddleware.Variant.fetchVariant(req)
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
