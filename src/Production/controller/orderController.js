import { ApplicationResponse } from '../../core/inc/response/ApplicationResponse.js'
import { ApplicationResult } from '../../core/result.js'
import { orderMiddleware } from '../middleware/orderMiddleware.js';

export class OrderController { }

OrderController.Orders = {


    /**
    * @name get all orders
    * @param {*} body
    */

    getOrders: async (req, res) => {

        orderMiddleware.Order.fetchOrders(req)
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
    * @name get Single order details
    * @param {*} body 
    */

    getsingleOrders: async (req, res) => {

        orderMiddleware.Order.fetchOrderDetails(req)
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

    // /**
    // * @name buy single product
    // * @param {*} token
    // */

    // buyNow: async (req, res) => {

    //     orderMiddleware.Checkout.buyNow(req)
    //         .then((data) => {
    //             const response = ApplicationResult.forCreated();
    //             var statuscode = 0;
    //             ApplicationResponse.success(
    //                 response,
    //                 null,
    //                 (response) => (statuscode = response.status)
    //             );
    //             res.json({ status: statuscode, data: data });
    //         })
    //         .catch((error) => {
    //             ApplicationResponse.error(error, null, (response) => {
    //                 res.status(response.status).json(response);
    //             });
    //         });
    // },

    /**
    * @name checkout all prodcts from cart
    * @param {*} token 
    */

    checkout: async (req, res) => {

        orderMiddleware.Checkout.checkOutAll(req)
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
    * @name make payment for orderId
    * @param {*} token 
    */

    makePayment: async (req, res) => {

        orderMiddleware.Payment.makePayment(req)
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



