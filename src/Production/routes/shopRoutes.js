import { Router } from "express";
import { UserAuthenticate } from "../controller/authController.js";
import { ShopController } from "../controller/shopController.js";



const shopRouter = Router();



//banners - Alphabetical Order
shopRouter.get("/banners", ShopController.shop.getBanners);

//category - Alphabetical Order
shopRouter.get("/category", ShopController.shop.getCategory);


//product -Alphabetical Order
shopRouter.post("/categoryProducts", ShopController.shop.getCategoryProducts);

//foryou
shopRouter.get("/forYou", UserAuthenticate,ShopController.shop.getForyou);

//hotdeals
shopRouter.get("/hotDeals", UserAuthenticate,ShopController.shop.hotDeals);

//faq
shopRouter.get("/faq", ShopController.shop.listFaq);

export { shopRouter };