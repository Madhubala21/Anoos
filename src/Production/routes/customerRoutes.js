import { Router } from "express";
import { Resizer } from "../../core/utils/imageResizer.js";
import { UserAuthenticate } from "../controller/authController.js";
import { CustomerController } from "../controller/customerController.js";



const customerRouter = Router();


//customer
customerRouter.get("/getUser", UserAuthenticate, CustomerController.Customer.getCustomer);
customerRouter.post("/register", CustomerController.Customer.addCustomer);
customerRouter.post("/updateUser", UserAuthenticate,Resizer, CustomerController.Customer.updateCustomer);

//shipping address
customerRouter.get("/getAddress", UserAuthenticate, CustomerController.Address.getAddress);
customerRouter.post("/addAddress", UserAuthenticate, CustomerController.Address.addAddress);
customerRouter.post("/updateAddress", UserAuthenticate, CustomerController.Address.updateAddress);

//wishlist
customerRouter.get("/getWishlist", UserAuthenticate, CustomerController.Wishlist.getWishlist);
customerRouter.post("/wishlist", UserAuthenticate, CustomerController.Wishlist.addWishlist);


export { customerRouter };