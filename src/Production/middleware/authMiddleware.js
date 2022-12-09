import require from "requirejs";
var CryptoJS = require("crypto-js");
import * as Error from "../../core/errors/ErrorConstant.js";
import { authentications } from "../../core/utils/jwt.js";
import { NodeMailerfunction } from "../../core/utils/nodemailer.js";
import { PayloadCompiler } from "../../core/inc/access/PayloadCompiler.js";
import { productionDbController } from "../../core/database/Controller/productionDBController.js";

export class authMiddleware {}

authMiddleware.User = {
  productionLogin: async ({ body }, device) => {
    // const validated = await PayloadCompiler.compile(body, "userLogin");
    const userFound = await productionDbController.Auth.checkemailExists(body);
    const passwordSecret = await configs.passwordSecret;
    if (!userFound || Object.keys(userFound).length === 0) {
      //no user available shouldnt be displayed to user
      throw Error.SomethingWentWrong("Wrong Email/Password. Try Again!");
    } else if (userFound.status === "terminated") {
      throw Error.SomethingWentWrong("Account Terminated");
    } else if (userFound.status === "inactive") {
      //send mail to activate account
      throw Error.SomethingWentWrong("Account InActive");
    } else if (userFound.status === "active") {
      try {
        const plain = CryptoJS.AES.decrypt(userFound.password, passwordSecret);
        // console.log("plain", plain);
        const decrypted = plain.toString(CryptoJS.enc.Utf8);
        // console.log("decrypted is", decrypted);
        if (decrypted === body.password) {
          const token = await authentications.generateUserJWT({
            userId: userFound.id,
            type: userFound.type,
            status: "active",
          });
          if (token) {
            var encryptedToken = CryptoJS.AES.encrypt(
              token,
              passwordSecret
            ).toString();
            const addSession =
              await productionDbController.Auth.session.createSession(
                encryptedToken,
                device
              );
            if (addSession != null && addSession != undefined) {
              return { token: encryptedToken };
            } else {
              throw Error.SomethingWentWrong();
            }
          } else {
            throw Error.SomethingWentWrong();
          }
        } else {
          throw Error.SomethingWentWrong("Wrong Email/Password. Try Again!");
        }
      } catch (error) {
        // console.log(error);
        throw Error.SomethingWentWrong("Wrong Email/Password. Try Again!");
      }
    } else {
      throw Error.SomethingWentWrong("Try again later");
    }
  },

  forgotPassword: async ({ body }) => {
    const userFound = await productionDbController.Auth.checkemailExists(body);
    if (
      userFound == null ||
      userFound == undefined ||
      Object.keys(userFound).length == 0
    ) {
      throw Error.NotFound("User");
    } else if (userFound.status === "terminated") {
      throw Error.AuthenticationFailed("User");
    } else {
      try {
        userFound.code = Math.floor(100000 + Math.random() * 900000);
        //+5mins = 60000*5
        var currentDate = Date.now();
        userFound.expiry = Number(currentDate) + Number(300000);

        const generateUid = await productionDbController.Auth.createUid(
          userFound
        );
        if (
          generateUid == null ||
          generateUid == undefined ||
          Object.keys(generateUid).length == 0
        ) {
          throw Error.SomethingWentWrong();
        } else {
          // function to send email code
          await NodeMailerfunction.Email.codeForForgotpassword(generateUid);
          // return generateUid;
          return "Check your Email";
        }
      } catch (error) {
        throw Error.SomethingWentWrong();
      }
    }
  },
  verifyEmailCode: async ({ body }) => {
    // console.log(body);
    // const validated = await PayloadCompiler.compile(body, "userLogin");
    // console.log("Validated", validated.data);
    const fetched = await productionDbController.Auth.checkemailExists(body);
    if (fetched.length != 0 && fetched != null && fetched != undefined) {
      var currentTime = Number(Date.now());
      var expiryMinutes = Number(300000); //5 mins
      var expiryTime = Number(fetched.expiry);
      var initiatedTime = expiryTime - expiryMinutes;
      var expired = currentTime - initiatedTime;
      if (expired <= expiryMinutes) {
        //expired should be lessthan or equal to 30,000
        const verifiedData = await productionDbController.Auth.verifyOtp(body);
        if (
          verifiedData == null ||
          verifiedData == undefined ||
          Object.keys(verifiedData).length == 0
        ) {
          throw Error.SomethingWentWrong("Code Not Valid");
        } else {
          // return "Code Verified";
          body.password = CryptoJS.AES.encrypt(
            body.password,
            configs.passwordSecret
          ).toString();
          const updatedData = await productionDbController.Auth.updatePassword(
            body
          );
          if (updatedData[0] != 0) {
            return "Password Updated";
          } else {
            throw Error.SomethingWentWrong("Unable to Update Password");
          }
        }
      } else {
        throw Error.SomethingWentWrong("Code Expired");
      }
    } else {
      throw Error.SomethingWentWrong("User Not Found");
    }
  },

  signOut: async ({ headers }) => {
    try {
      if (headers.hasOwnProperty("authtoken")) {
        const signOutUser =
          await productionDbController.Auth.session.destroySession(
            headers.authtoken
          );
        if (Boolean(signOutUser) == true) {
          return "Logout Successful";
        } else {
          throw Error.SomethingWentWrong();
        }
      } else {
        throw Error.SomethingWentWrong();
      }
    } catch (error) {
      throw Error.SomethingWentWrong();
    }
  },

  get_started: async ({ query }) => {
    const verifyToken = query.verifyEmail;
    //decrypt token
    // const plain =CryptoJS.AES.decrypt(verifyToken, configs.passwordSecret);
    // const decrypted = plain.toString(CryptoJS.enc.Utf8);
    //decode token
    const decodedEmailToken = await authentications.verifyEmailToken(
      verifyToken
    );
    // console.log("decoded token", decodedEmailToken);
    if (decodedEmailToken == undefined || decodedEmailToken == null) {
      return "Token Expired ! Try Again";
    } else {
      const userFound = await productionDbController.Customer.checkUserExists(
        decodedEmailToken
      );
      if (userFound.status == "inactive") {
        const statusUpdated = await productionDbController.Auth.verifyUser(
          userFound
        );
        if (
          statusUpdated[0] != 0 &&
          statusUpdated != undefined &&
          statusUpdated != null
        ) {
          return "Account Verified";
        } else {
          return "Account not Verified";
        }
      } else if (userFound.status == "active") {
        return "Account already Verified";
      } else {
        return "Account Terminated Contact Admin";
      }
    }
  },

  verify: async ({ headers }) => {
    var isMalicious = true;
    if (headers.hasOwnProperty("productiontoken")) {
      //check authentication
      const findSession = await productionDbController.Auth.session.findSession(
        headers.productiontoken
      );

      if (
        findSession != null &&
        findSession != undefined &&
        Object.keys(findSession).length != 0
      ) {
        //decrypt token
        var plain = CryptoJS.AES.decrypt(
          findSession.token,
          configs.passwordSecret
        );
        findSession.token = plain.toString(CryptoJS.enc.Utf8);

        const decoded = await authentications.verifyUserJWT(findSession.token);

        if (
          decoded != null &&
          decoded != undefined &&
          decoded.status == "active"
        ) {
          const foundUser =
            await productionDbController.Auth.checkUserExistsDecode(decoded);
          // !=null && !=undefned - true
          // console.log("foundUser", foundUser);
          if (
            foundUser != null &&
            foundUser != undefined &&
            Object.keys(foundUser).length != 0
          ) {
            return foundUser.id;
          } else {
            throw Error.AuthenticationFailed("UnAuthorized");
          }
        } else {
          throw Error.AuthenticationFailed("UnAuthorized");
        }
      } else {
        throw Error.AuthenticationFailed("UnAuthorized");
      }
    }
    if (isMalicious) {
      return false;
    }
  },
  viewProductionProfile: async ({ token }) => {
    // console.log("token", token);
    const accoundFound =
      await productionDbController.Auth.viewProductionProfile(token);
    if (accoundFound != null && accoundFound != undefined) {
      return accoundFound;
    } else {
      return "Data not found";
    }
  },
  updateProductionProfile: async ({ body, token }) => {
    // console.log("token", token);
    const accoundFound =
      await productionDbController.Auth.updateProductionProfile(body, token);
    if (accoundFound != null && accoundFound != undefined) {
      return accoundFound;
    } else {
      return "Data not found";
    }
  },
};
