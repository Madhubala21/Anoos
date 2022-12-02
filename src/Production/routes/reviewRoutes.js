import { Router } from "express";
import { UserAuthenticate } from "../controller/authController.js";
import { ReviewController } from "../controller/reviewController.js";





const reviewRouter = Router();


//product review
reviewRouter.post("/", UserAuthenticate, ReviewController.Review.getProductReview);

//check if order delivered
reviewRouter.get("/MyReview", UserAuthenticate, ReviewController.Review.fetchMyReviews);
reviewRouter.post("/addReview", UserAuthenticate, ReviewController.Review.addProductReview);
reviewRouter.post("/removeReview", UserAuthenticate, ReviewController.Review.removeProductReview);




export { reviewRouter };