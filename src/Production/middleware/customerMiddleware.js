import require from "requirejs";
var CryptoJS = require("crypto-js");
import * as Error from "../../core/errors/ErrorConstant.js";
import { authentications } from "../../core/utils/jwt.js";
import { userDbController } from "../../core/database/Controller/userDbController.js";
import { NodeMailerfunction } from "../../core/utils/nodemailer.js";
import moment from "moment";

export class customerMiddleware {}

//customer
customerMiddleware.Customer = {
  createCustomer: async ({ body }) => {
    // const compiled = await PayloadCompiler.compile(body, "customerCreate");
    const existingUser = await userDbController.Auth.checkUserExists(body);
    if (
      existingUser == null ||
      existingUser == undefined ||
      Object.keys(existingUser).length == 0
    ) {
      body.password = CryptoJS.AES.encrypt(
        body.password,
        configs.passwordSecret
      ).toString();
      if (moment(body.dob, "DD/MM/YYYY").year() >= 2005) {
        throw Error.SomethingWentWrong("Your age is not valid");
      }
      const newUser = await userDbController.Customer.createCustomer(body);
      if (
        newUser != null &&
        newUser != undefined &&
        Object.keys(newUser).length != 0
      ) {
        //generate new verify token
        await NodeMailerfunction.Email.getStarted(newUser);
        return "Verification Link Sent";
      } else {
        return "Failed to create User";
      }
    } else if (existingUser.status == "inactive") {
      //activate Account
      await NodeMailerfunction.Email.getStarted(existingUser);
      return "Verification Link Sent Again";
    } else if (existingUser.status == "terminated") {
      //activate Account
      await NodeMailerfunction.Email.getStarted(existingUser);
      return "You have been Terminated..!";
    } else {
      return "Account Already Exists";
    }
  },
  fetchCustomer: async ({ token, body }) => {
    if (token == false) {
      throw Error.AuthenticationFailed();
    }
    body.customerId = token;
    const fetched = await userDbController.Customer.fetchCustomer(body);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      throw Error.SomethingWentWrong();
    }
  },
  putCustomer: async ({ body, token, image }) => {
    body.userId = token;
    const findUser = await userDbController.Customer.checkUserExists(body);
    if (image === null || image === undefined || image === "") {
      image = findUser.profilePic;
    }
    if (
      findUser != null &&
      findUser != undefined &&
      Object.keys(findUser).length != 0
    ) {
      const userUpdated = await userDbController.Customer.updateCustomers(
        body,
        token,
        image
      );
      if (userUpdated[0] == 1) {
        return "Profile Updated";
      } else {
        return "Profile Update Failed";
      }
    } else {
      throw Error.AuthenticationFailed("Session Timed Out");
    }
  },
};

//address
customerMiddleware.Address = {
  getAddress: async ({ body, token }) => {
    console.log(body, token);
    if (token == false || token == null || token == undefined) {
      throw Error.AuthenticationFailed();
    }
    body.customerId = token;
    const fetched = await userDbController.Address.fetchAddress(body);
    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      return fetched;
    } else {
      return "No Address Available";
    }
  },

  createAddress: async ({ body, token }) => {
    if (token == false || token == null || token == undefined) {
      throw Error.AuthenticationFailed();
    }
    body.customerId = token;

    const existingUser = await userDbController.Address.checkAddressExists(
      body
    );
    if (
      existingUser == null ||
      existingUser == undefined ||
      Object.keys(existingUser).length == 0
    ) {
      if (body.primary === "yes") {
        const updateAdress = await userDbController.Address.changeAllPrimary(
          body
        );
        if (
          updateAdress[0] != 0 ||
          updateAdress == null ||
          updateAdress == undefined
        ) {
          const created = await userDbController.Address.addAddress(body);
          if (created != null && created != undefined) {
            return "Created Successfully";
          } else {
            throw Error.SomethingWentWrong("Failed to add another Address");
          }
        } else {
          const created = await userDbController.Address.addAddress(body);
          if (created != null && created != undefined) {
            return "Created Successfully";
          } else {
            throw Error.SomethingWentWrong("Failed to add another Address");
          }
        }
      } else {
        if (body.primary === "no") {
          const created = await userDbController.Address.addAddress(body);
          if (created != null && created != undefined) {
            return "Created Successfully";
          } else {
            throw Error.SomethingWentWrong("Failed to add another Address");
          }
        }
      }
    } else {
      return "Address Already Exists";
    }
  },

  putAddress: async ({ body, token }) => {
    if (token == false || token == null || token == undefined) {
      throw Error.AuthenticationFailed();
    }
    body.customerId = token;
    if (body.action == "edit") {
      const existingUser =
        await userDbController.Address.checkAddressExistsExcept(body);
      if (
        existingUser != null &&
        existingUser != undefined &&
        Object.keys(existingUser).length != 0
      ) {
        return "Address Already Exists";
      } else {
        body.shippingAddress = body.addressId;

        const fetchAddress = await userDbController.Address.fetchAddressbyId(
          body
        );
        if (body.primary === "yes" && fetchAddress.primary == "yes") {
          const updateAdress = await userDbController.Address.changeAllPrimary(
            body
          );
          const updatePrimary = await userDbController.Address.changePrimary(
            fetchAddress,
            body
          );
          if (updatePrimary[0] != 0 && updateAdress[0] != 0) {
            //function call
            return UpdateAddress(body, token);
          }
        } else if (body.primary === "no" && fetchAddress.primary == "yes") {
          const updateAdress = await userDbController.Address.changeAllPrimary(
            body
          );
          const updatePrimary = await userDbController.Address.changePrimary(
            fetchAddress,
            body
          );
          if (updatePrimary[0] != 0 && updateAdress[0] != 0) {
            //function call
            return UpdateAddress(body, token);
          }
        } else if (body.primary === "yes" && fetchAddress.primary == "no") {
          const updatePrimary = await userDbController.Address.changePrimary(
            fetchAddress,
            body
          );
          if (updatePrimary[0] != 0) {
            //function call
            return UpdateAddress(body, token);
          }
        } else if (body.primary === "no" && fetchAddress.primary == "no") {
          const updatePrimary = await userDbController.Address.changePrimary(
            fetchAddress,
            body
          );
          if (updatePrimary[0] != 0) {
            //function call
            return UpdateAddress(body, token);
          }
        }

        //fun def
        function UpdateAddress(body, token) {
          const addressUpdated = userDbController.Address.updateAddressbyId(
            body,
            token
          );
          if (addressUpdated[0] != 0) {
            return "Update Success";
          } else {
            return "Failed to Update";
          }
        }
      }
    } else if (body.action == "delete") {
      body.shippingAddress = body.addressId;
      const fetchAddress = await userDbController.Address.fetchAddressbyId(
        body
      );
      if (fetchAddress.primary == "no") {
        const userUpdated = await userDbController.Address.updateAddress(
          body,
          token
        );
        if (userUpdated[0] != 0 && userUpdated[0] != undefined) {
          return "Address Deleted";
        } else {
          return "Failed to Update Address";
        }
      }
      if (fetchAddress.primary == "yes") {
        throw Error.SomethingWentWrong("Unable to Delete Primary Address");
      }
    } else {
      return "No Action Selected";
    }
  },
};

//wishlist
customerMiddleware.Wishlist = {
  fetchWishlist: async ({ token }) => {
    if (token == false || token == undefined || token == null) {
      throw Error.AuthenticationFailed();
    }
    var fetchedId = await userDbController.Shop.getWishlistId(token);
    var productIds = [];
    for (let index = 0; index < fetchedId.length; index++) {
      productIds.push(fetchedId[index].productId);
    }

    var fetched = await userDbController.Shop.getWishlists(productIds);

    //Identify Duplicate id and remove array
    var fetched = Array.from(new Set(fetched.map((a) => a.id))).map((id) => {
      return fetched.find((a) => a.id === id);
    });

    if (
      fetched != null &&
      fetched != undefined &&
      Object.keys(fetched).length != 0
    ) {
      for (var index = 0; index < fetched.length; index++) {
        //replace  product variant - price null to 0
        fetched[index].productVariants.discountPrice = JSON.parse(
          fetched[index].productVariants.discountPrice
        );
        if (fetched[index].productVariants.discountPrice == null) {
          fetched[index].productVariants.discountPrice = 0;
        } else {
          fetched[index].discountPrice = Number(
            fetched[index].productVariants.discountPrice[0]
          );
        }
        if (fetched[index].ratings == null) {
          fetched[index].ratings = 0;
        } else {
          //convert ratings- 2.3000 to 2.3
          var rate = fetched[index].ratings;
          fetched[index].ratings = Math.sign(rate) * Math.abs(rate);
        }
        if (fetched[index].productVariants.id != null) {
          fetched[index].variantId = fetched[index].productVariants.id;
          fetched[index].ratings = fetched[index].ratings;
          delete fetched[index].productVariants;
        } else {
          delete fetched[index].productVariants;
          fetched[index].id = "false";
          fetched[index].discountPrice = "false";
          fetched[index].variantId = "false";
        }
      }
      console.table("wishlists :", fetched);
      return fetched;
    } else {
      throw Error.SomethingWentWrong("No Wishlist found");
    }
  },

  createWishlist: async ({ body, token }) => {
    // const compiled = await PayloadCompiler.compile(body, "customerCreate");
    const existingWishlist =
      await userDbController.Wishlist.checkWishlistExists(body, token);
    if (
      existingWishlist == null ||
      existingWishlist == undefined ||
      Object.keys(existingWishlist).length == 0
    ) {
      const created = await userDbController.Wishlist.addWishlist(body, token);
      if (created != null && created != undefined) {
        return "Added to Wishlist";
      } else {
        throw Error.SomethingWentWrong("Failed to add Wishlist");
      }
    } else {
      const removed = await userDbController.Wishlist.removeWishlist(
        existingWishlist
      );
      if (removed[0] != 0) {
        return "Removed from Wishlist";
      } else {
        throw Error.SomethingWentWrong();
      }
    }
  },
};
