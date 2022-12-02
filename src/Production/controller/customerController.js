import { ApplicationResult } from "../../core/result.js";
import { ApplicationResponse } from "../../core/inc/response/ApplicationResponse.js";
import { customerMiddleware } from "../middleware/customerMiddleware.js";

export class CustomerController { }


CustomerController.Customer = {


    /**
    * @name get single user
    * @param {*} token
    */

    getCustomer: async (req, res) => {
        customerMiddleware.Customer.fetchCustomer(req)
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
    * @name Create New User
    * @param {*} token
    */


    addCustomer: async (req, res) => {
        customerMiddleware.Customer.createCustomer(req)
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
    * @name update single user
    * @param {*} token
    */

    updateCustomer: async (req, res) => {
        customerMiddleware.Customer.putCustomer(req)
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

CustomerController.Address = {

    /**
    * @name get user's Address
    * @param {*} token
    */


    getAddress: async (req, res) => {
        customerMiddleware.Address.getAddress(req)
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
    * @name add new Address
    * @param {*} token
    */


    addAddress: async (req, res) => {
        customerMiddleware.Address.createAddress(req)
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
    * @name update Address
    * @param {*} token
    */


    updateAddress: async (req, res) => {
        customerMiddleware.Address.putAddress(req)
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

CustomerController.Wishlist = {

    /**
    * @name get user's Wishlist
    * @param {*} token
    */


    getWishlist: async (req, res) => {
        customerMiddleware.Wishlist.fetchWishlist(req)
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
    * @name add/remove wishlist
    * @param {*} token
    */


    addWishlist: async (req, res) => {
        customerMiddleware.Wishlist.createWishlist(req)
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