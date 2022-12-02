import { Router } from "express";
import { Resizer } from "../../core/utils/imageResizer.js";
import { UserAuthenticate } from "../controller/authController.js";
import { CartController } from "../controller/cartController.js";



const cartRouter = Router();



//cart

cartRouter.get("/", UserAuthenticate, CartController.Cart.getCart);
cartRouter.get("/count", UserAuthenticate, CartController.Cart.getCartCount);
cartRouter.post("/addCart", UserAuthenticate, CartController.Cart.addCart);
cartRouter.post("/buy", UserAuthenticate, CartController.Cart.addCart);
cartRouter.post("/updateCart", UserAuthenticate, CartController.Cart.updateCart);
cartRouter.post("/removeCart", UserAuthenticate, CartController.Cart.removeCart);


export { cartRouter };