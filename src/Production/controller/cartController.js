import { ApplicationResponse } from '../../core/inc/response/ApplicationResponse.js'
import { ApplicationResult } from '../../core/result.js'
import { cartMiddleware } from '../middleware/cartMiddleware.js';

export class CartController { }

CartController.Cart = {

    /**
    * @name get User's Cart
    * @param {*} token 
    */

    getCart: async (req, res) => {
        cartMiddleware.Cart.fetchCart(req)
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
    * @name Get Cart Count for Badge
    * @param {*} body
    */


    getCartCount: async (req, res) => {

        cartMiddleware.Cart.fetchCount(req)
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
    * @name add to cart
    * @param {*} body 
    */

    addCart: async (req, res) => {

        cartMiddleware.Cart.createCart(req)
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
    * @name update Cart
    * @param {*} body 
    */

    updateCart: async (req, res) => {

        cartMiddleware.Cart.updateCart(req)
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
    * @name remove from cart
    * @param {*} body 
    */

    removeCart: async (req, res) => {

        cartMiddleware.Cart.removeCart(req)
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



