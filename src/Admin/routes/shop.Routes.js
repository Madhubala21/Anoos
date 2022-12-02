import { Router } from "express";
import { adminAuthenticate } from "../controller/auth.Controller.js";
import { AdminController } from "../controller/admin.Controller.js";
import { bannerResizer } from "../../core/utils/imageResizer.js";

const shopRouter = Router();

//dashboard
shopRouter.get(
  "/dashboard",
  adminAuthenticate,
  AdminController.Customer.getAnalytics
);

//customers
shopRouter.get(
  "/customer",
  adminAuthenticate,
  AdminController.Customer.getCustomers
);
shopRouter.post(
  "/singleCustomer",
  adminAuthenticate,
  AdminController.Customer.getSingleCustomer
);
shopRouter.post(
  "/updateCustomer",
  adminAuthenticate,
  AdminController.Customer.updateCustomer
);

//banners
shopRouter.get("/", adminAuthenticate, AdminController.Banners.getBanners);
shopRouter.post(
  "/addBanners",
  adminAuthenticate,
  bannerResizer,
  AdminController.Banners.addBanners
);
shopRouter.post(
  "/updateBanners",
  adminAuthenticate,
  AdminController.Banners.updateBanners
);

//tax
shopRouter.post("/tax", adminAuthenticate, AdminController.Shop.getTax);
shopRouter.post("/addTax", adminAuthenticate, AdminController.Shop.addTax);
shopRouter.post(
  "/removeTax",
  adminAuthenticate,
  AdminController.Shop.removeTax
);

//faq
shopRouter.get("/faq", adminAuthenticate, AdminController.Shop.getFaq);
shopRouter.post("/addFAQ", adminAuthenticate, AdminController.Shop.addFaq);
shopRouter.post(
  "/removeFAQ",
  adminAuthenticate,
  AdminController.Shop.removeFaq
);

//reviews

//orders
// shopRouter.post("/getallOrders", adminAuthenticate, AdminController.Orders.getallOrders);
// shopRouter.post("/updateOrders", adminAuthenticate, AdminController.Orders.updateOrders);
// shopRouter.post("/deliveryLocation", adminAuthenticate, AdminController.Orders.deliveryLocation);

export { shopRouter };
