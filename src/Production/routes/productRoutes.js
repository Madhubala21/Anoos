import { Router } from "express";
import { ProductController } from "../controller/productController.js";
import { UserAuthenticate } from "../controller/authController.js";



const productRouter = Router();


//all products
productRouter.post("/", UserAuthenticate, ProductController.Product.getFilters);

//list single product variant
productRouter.post("/variant", UserAuthenticate, ProductController.Variant.getVariant);

//product Specifications
productRouter.post("/specification", UserAuthenticate, ProductController.Product.getSpecs);

//recommended
productRouter.get("/recommended", ProductController.Product.getRecommended);

export { productRouter };