import { ApplicationResponse } from '../../core/inc/response/ApplicationResponse.js'
import { ApplicationResult } from '../../core/result.js'
import { reviewMiddleware } from '../middleware/reviewMiddleware.js';

export class ReviewController { }

ReviewController.Review = {

    getProductReview: async (req, res) => {

        /**
        * @name get single Product's Review
        * @param {*} token 
        */

        reviewMiddleware.Review.fetchProductReview(req)
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
    fetchMyReviews: async (req, res) => {

        /**
        * @name get my Reviews
        * @param {*} token 
        */

        reviewMiddleware.Review.fetchReviews(req)
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
    * @name add a review
    * @param {*} body
    */

    addProductReview: async (req, res) => {
        reviewMiddleware.Review.createReview(req)
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
    * @name update a review
    * @param {*} body 
    */


    removeProductReview: async (req, res) => {

        reviewMiddleware.Review.updateReview(req)
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



