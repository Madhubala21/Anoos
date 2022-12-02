import { userDbController } from "../../core/database/Controller/userDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";
import moment from 'moment'

export class reviewMiddleware { }

//products
reviewMiddleware.Review = {
    fetchProductReview: async ({ body }) => {
        var reviews = await userDbController.Review.getProductReview(body);

        var reviewData = await userDbController.Review.getProductRatings(body);
        if (reviewData === null || reviewData === undefined || Object.keys(reviewData).length === 0) {
            reviewData = 0;
        } else {
            //review data
            reviewData.excellent = Math.round((reviewData.excellent * 100) / reviewData.noOfRatings);
            reviewData.best = Math.round((reviewData.best * 100) / reviewData.noOfRatings);
            reviewData.good = Math.round((reviewData.good * 100) / reviewData.noOfRatings);
            reviewData.poor = Math.round((reviewData.poor * 100) / reviewData.noOfRatings);
            reviewData.verypoor = Math.round((reviewData.verypoor * 100) / reviewData.noOfRatings);

            var rate = reviewData.overallRatings;
            reviewData.overallRatings = Number(Math.sign(rate) * Math.abs(rate));
            reviewData.overallRatings = reviewData.overallRatings.toFixed(1);
        }
        if (reviews != null && reviews != undefined && Object.keys(reviews).length != 0) {
            for (var index = 0; index < reviews.length; index++) {
                if (reviews[index].customerImage == null) {
                    reviews[index].customerImage = configs.placeholder;
                }
                reviews[index].createdAt = moment(reviews[index].createdAt).fromNow();
            }
            return { reviews, reviewData };
        } else {
            return "No Reviews Found"
        }
    },
    fetchReviews: async ({ token }) => {
        const fetched = await userDbController.Review.fetchMyReviews(token);
        if (fetched.length != 0) {
            for (let index = 0; index < fetched.length; index++) {
                fetched[index].variantImage = JSON.parse(fetched[index].variantImage);
                fetched[index].variantImage = fetched[index].variantImage[0];
                fetched[index].actualPrice = JSON.parse(fetched[index].actualPrice);
                fetched[index].actualPrice = fetched[index].actualPrice[0];
                fetched[index].discountPrice = JSON.parse(fetched[index].discountPrice);
                fetched[index].discountPrice = fetched[index].discountPrice[0];
                fetched[index].id = fetched[index].reviews.id;
                fetched[index].rating = fetched[index].reviews.rating;
                fetched[index].review = fetched[index].reviews.review;
                fetched[index].createdAt = moment(fetched[index].reviews.createdAt).fromNow();
                delete fetched[index].reviews;
            }
            return fetched;
        } else {
            return "No Reviews Found"
        }

    },
    createReview: async ({ body, token }) => {
        body.customerId = token;
        var fetchUser = await userDbController.Customer.fetchCustomer(body)
        //fetch order details -ifReviewed and orderId
        // const fetchOrder=await userDbController
        if (fetchUser != null && fetchUser != undefined && Object.keys(fetchUser).length != 0) {
            body.customerId = token;
            body.customerName = fetchUser?.userName || "User";
            body.customerImage = fetchUser?.profilePic || configs.placeholder || "https://ik.imagekit.io/lokki/Avatar/placeholder_XFzrDmSml.png?updatedAt=1638958916450";
            var created = await userDbController.Review.addProductReview(body);
            if (created != null && created != undefined && Object.keys(created).length != 0) {
                //update isRevieed = 1 in MyOrders
                var fetchOrder = await userDbController.Order.fetchbyOrderId(body);
                body.isReviewed = JSON.parse(fetchOrder.isReviewed);
                body.isReviewed[body.reviewIndex] = 1;
                body.isReviewed = JSON.stringify(body.isReviewed);
                const updateReview = await userDbController.Review.updateOrderReview(body);
                if (updateReview[0] != 0 && updateReview[0] != undefined) {
                    return "Thankyou for your Review :)";
                } else {
                    throw Error.SomethingWentWrong("Failed to Add a review");
                }
            } else {
                throw Error.SomethingWentWrong("Failed to Add a review");
            }
        } else {
            throw Error.AuthenticationFailed();
        }
    },
    updateReview: async ({ body, token }) => {
        if (token == false) {
            throw Error.AuthenticationFailed();
        }
        if (body.action == "delete") {
            var deleted = await userDbController.Review.destroyReview(body, token);
            if (deleted != 0 && deleted != undefined) {
                return "Review Deleted";
            } else {
                return "Unable to Delete a Review";
            }
        } else if (body.action == "edit") {
            console.log(body);
            var updated = await userDbController.Review.putProductReview(body, token);
            if (updated[0] != 0 && updated[0] != undefined) {
                return "Review Updated";
            } else {
                return "Unable to Update a Review";
            }
        } else {
            return "No Action Selected";
        }

    },
};


