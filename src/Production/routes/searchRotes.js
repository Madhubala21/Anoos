import { Router } from "express";
import { Resizer } from "../../core/utils/imageResizer.js";
import { UserAuthenticate } from "../controller/authController.js";
import { ShopController } from "../controller/shopController.js";



const searchRouter = Router();


//search products
searchRouter.post("/", UserAuthenticate, ShopController.shop.getSearchResults);




export { searchRouter };