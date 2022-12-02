import { adminDbController } from "../../core/database/Controller/adminDbController.js";
import { userDbController } from "../../core/database/Controller/userDbController.js";
import { admin } from "../../core/database/models/adminModel.js";
import * as Error from "../../core/errors/ErrorConstant.js";
import {
  isDataInvalid,
  isDataValid,
  isUpdated,
} from "../../core/utils/functions.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";

export class adminMiddleware {}

//banners
adminMiddleware.Banners = {
  fetchBanners: async ({ body }) => {
    const fetched = await adminDbController.Shop.fetchbanners(body);
    if (isDataValid(fetched)) {
      return fetched;
    }
  },

  createBanners: async ({ body, image }) => {
    body.bannerImage = image;
    const created = await adminDbController.Shop.createbanners(body);
    if (isDataValid(created)) {
      return "Banner Created Successfully";
    } else {
      return "Failed to Create Banner";
    }
  },
  putBanners: async ({ body }) => {
    const updated = await adminDbController.Shop.putbanners(body);
    if (updated[0] != 0) {
      return "Updated Success";
    } else {
      return "Update Failed";
    }
  },
};

//banners
adminMiddleware.Shop = {
  fetchFaq: async ({ body }) => {
    const fetched = await adminDbController.Shop.getfaq(body);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      throw Error.SomethingWentWrong();
    }
  },
  fetchTax: async ({ body }) => {
    const fetched = await adminDbController.Shop.fetchTax(body);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "No Taxes found";
    }
  },
  createTax: async ({ body }) => {
    const created = await adminDbController.Shop.addTax(body);
    if (
      created != null &&
      created != undefined &&
      Object.keys(created).length != 0
    ) {
      return "Tax Created Successfully";
    } else {
      throw Error.SomethingWentWrong("Failed to Create Tax");
    }
  },
  deleteTax: async ({ body }) => {
    const fetched = await adminDbController.Category.fetchCategoryTax(body);
    if (
      fetched == null ||
      fetched == undefined ||
      Object.keys(fetched).length == 0
    ) {
      const removed = await adminDbController.Shop.removeTax(body);
      if (removed[0] != 0) {
        return "Tax Deleted Successfully";
      }
    } else {
      throw Error.SomethingWentWrong("Category Exists in this Tax");
    }
  },
  createFaq: async ({ body }) => {
    const created = await adminDbController.Shop.addfaq(body);
    if (
      created != null &&
      created != undefined &&
      Object.keys(created).length != 0
    ) {
      return "FAQ Created Successfully";
    } else {
      throw Error.SomethingWentWrong("Failed to Create FAQ");
    }
  },
  deleteFaq: async ({ body }) => {
    const updated = await adminDbController.Shop.removefaq(body);
    if (updated[0] != 0) {
      return "FAQ Upated Successfully";
    } else {
      throw Error.SomethingWentWrong("Failed to Update FAQ");
    }
  },
};

//banners
adminMiddleware.Customer = {
  fetchAnalytics: async ({}) => {
    const fetchCustomers = await adminDbController.Customer.fetchCustomers();
    const fetchCategory = await adminDbController.Category.fetchCategoryCount();
    const fetchProduct = await adminDbController.Product.fetchProductCount();
    const fetchOrders = await adminDbController.Orders.fetchOrderCount();
    if (
      fetchCustomers != null &&
      fetchCustomers != undefined &&
      fetchCustomers.length != 0
    ) {
      var active = 0;
      var inactive = 0;
      var terminated = 0;

      for (let index = 0; index < fetchCustomers.length; index++) {
        if (fetchCustomers[index].status == "active") {
          active = active + 1;
        }
        if (fetchCustomers[index].status == "inactive") {
          inactive = inactive + 1;
        }
        if (fetchCustomers[index].status == "terminated") {
          terminated = terminated + 1;
        }
      }
    }
    let analytics;
    return (analytics = {
      activeCustomer: active,
      inactiveCustomer: inactive,
      terminatedCustomer: terminated,
      category: fetchCategory,
      product: fetchProduct,
      orders: fetchOrders,
    });
  },
  getallCustomer: async () => {
    const fetchCustomers = await adminDbController.Customer.fetchCustomers();
    if (
      fetchCustomers != null &&
      fetchCustomers != undefined &&
      fetchCustomers.length != 0
    ) {
      return fetchCustomers;
    } else {
      return "No Users Found";
    }
  },
  fetchSingleCustomer: async ({ body }) => {
    var fetched = await adminDbController.Customer.getSingleCustomer(body);
    var fetchedAddress = await userDbController.Address.fetchAddress(body);
    if (isDataInvalid(fetched)) {
      fetchedAddress = "No User Found";
    }
    if (isDataInvalid(fetchedAddress)) {
      fetchedAddress = "No Address Found";
    }
    return { fetched, fetchedAddress };
  },
  updateSingleCustomer: async ({ body }) => {
    const updated = await adminDbController.Customer.updateCustomer(body);
    if (isUpdated(updated)) {
      return "Updated Success";
    }
  },
};
