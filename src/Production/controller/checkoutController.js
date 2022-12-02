// import { ApplicationResponse } from '../../core/inc/response/ApplicationResponse.js'
// import { ApplicationResult } from '../../core/result.js'
// import { reviewMiddleware } from '../middleware/reviewMiddleware.js';

// export class CheckoutController { }

// CheckoutController.Cart = {

//     getCart: async (req, res) => {

//         /**
//         * @name get single Product's Review
//         * @param {*} token 
//         */

//         reviewMiddleware.Review.fetchProductReview(req)
//             .then((data) => {
//                 const response = ApplicationResult.forCreated();
//                 var statuscode = 0;
//                 ApplicationResponse.success(
//                     response,
//                     null,
//                     (response) => (statuscode = response.status)
//                 );
//                 res.json({ status: statuscode, data: data });
//             })
//             .catch((error) => {
//                 ApplicationResponse.error(error, null, (response) => {
//                     res.status(response.status).json(response);
//                 });
//             });
//     },

//     getCartCount: async (req, res) => {

//         /**
//         * @name add a review
//         * @param {*} body
//         */

//         reviewMiddleware.Review.createReview(req)
//             .then((data) => {
//                 const response = ApplicationResult.forCreated();
//                 var statuscode = 0;
//                 ApplicationResponse.success(
//                     response,
//                     null,
//                     (response) => (statuscode = response.status)
//                 );
//                 res.json({ status: statuscode, data: data });
//             })
//             .catch((error) => {
//                 ApplicationResponse.error(error, null, (response) => {
//                     res.status(response.status).json(response);
//                 });
//             });
//     },
//     addCart: async (req, res) => {

//         /**
//         * @name update a review
//         * @param {*} body 
//         */

//         reviewMiddleware.Review.updateReview(req)
//             .then((data) => {
//                 const response = ApplicationResult.forCreated();
//                 var statuscode = 0;
//                 ApplicationResponse.success(
//                     response,
//                     null,
//                     (response) => (statuscode = response.status)
//                 );
//                 res.json({ status: statuscode, data: data });
//             })
//             .catch((error) => {
//                 ApplicationResponse.error(error, null, (response) => {
//                     res.status(response.status).json(response);
//                 });
//             });
//     },
//     updateCart: async (req, res) => {

//         /**
//         * @name update a review
//         * @param {*} body 
//         */

//         reviewMiddleware.Review.updateReview(req)
//             .then((data) => {
//                 const response = ApplicationResult.forCreated();
//                 var statuscode = 0;
//                 ApplicationResponse.success(
//                     response,
//                     null,
//                     (response) => (statuscode = response.status)
//                 );
//                 res.json({ status: statuscode, data: data });
//             })
//             .catch((error) => {
//                 ApplicationResponse.error(error, null, (response) => {
//                     res.status(response.status).json(response);
//                 });
//             });
//     },
//     removeCart: async (req, res) => {

//         /**
//         * @name update a review
//         * @param {*} body 
//         */

//         reviewMiddleware.Review.updateReview(req)
//             .then((data) => {
//                 const response = ApplicationResult.forCreated();
//                 var statuscode = 0;
//                 ApplicationResponse.success(
//                     response,
//                     null,
//                     (response) => (statuscode = response.status)
//                 );
//                 res.json({ status: statuscode, data: data });
//             })
//             .catch((error) => {
//                 ApplicationResponse.error(error, null, (response) => {
//                     res.status(response.status).json(response);
//                 });
//             });
//     },
// };



