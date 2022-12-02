import require from "requirejs";
var CryptoJS = require("crypto-js");
import * as Error from "../../core/errors/ErrorConstant.js";
import { authentications } from "../../core/utils/jwt.js";
import { userDbController } from "../../core/database/Controller/userDbController.js";
import { NodeMailerfunction } from "../../core/utils/nodemailer.js";
import { PayloadCompiler } from "../../core/inc/access/PayloadCompiler.js";

export class authMiddleware { }

authMiddleware.User = {
  email_login: async ({ body }, device) => {
    const validated = await PayloadCompiler.compile(body, "userLogin");
    const userFound = await userDbController.Auth.checkemailExists(validated.data);
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
        const decrypted = plain.toString(CryptoJS.enc.Utf8);
        if (decrypted === body.password) {
          const token = await authentications.generateUserJWT({ userId: userFound.id, status: "active", });
          if (token) {
            var encryptedToken = CryptoJS.AES.encrypt(token, passwordSecret).toString();
            const addSession = await userDbController.Auth.session.createSession(encryptedToken, device);
            if (addSession != null && addSession != undefined) {
              return { token: encryptedToken, };
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
        throw Error.SomethingWentWrong("Wrong Email/Password. Try Again!");
      }
    } else {
      throw Error.SomethingWentWrong();
    }
  },

  forgotPassword: async ({ body }) => {
    const userFound = await userDbController.Auth.checkemailExists(body);
    if (userFound == null || userFound == undefined || Object.keys(userFound).length == 0) {
      throw Error.NotFound("User");
    } else if (userFound.status === "terminated") {
      throw Error.AuthenticationFailed("User");
    } else {
      try {
        userFound.code = Math.floor(100000 + Math.random() * 900000);
        //+5mins = 60000*5
        var currentDate = Date.now();
        userFound.expiry = Number(currentDate) + Number(300000);

        const generateUid = await userDbController.Auth.createUid(userFound);
        if (generateUid == null || generateUid == undefined || Object.keys(generateUid).length == 0) {
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
    const fetched = await userDbController.Auth.checkemailExists(body);
    if (fetched.length != 0 && fetched != null && fetched != undefined) {
      var currentTime = Number(Date.now());
      var expiryMinutes = Number(300000);//5 mins
      var expiryTime = Number(fetched.expiry);
      var initiatedTime = expiryTime - expiryMinutes;
      var expired = currentTime - initiatedTime;
      if (expired <= expiryMinutes) {
        //expired should be lessthan or equal to 30,000
        const verifiedData = await userDbController.Auth.verifyOtp(body);
        if (verifiedData == null || verifiedData == undefined || Object.keys(verifiedData).length == 0) {
          throw Error.SomethingWentWrong("Code Not Valid");
        } else {
          // return "Code Verified";
          body.password = CryptoJS.AES.encrypt(body.password, configs.passwordSecret).toString();
          const updatedData = await userDbController.Auth.updatePassword(body);
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
        const signOutUser = await userDbController.Auth.session.destroySession(headers.authtoken);
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
    const decodedEmailToken = await authentications.verifyEmailToken(verifyToken);
    // console.log("decoded token", decodedEmailToken);
    if (decodedEmailToken == undefined || decodedEmailToken == null) {
      return "Token Expired ! Try Again";
    } else {
      const userFound = await userDbController.Customer.checkUserExists(decodedEmailToken);
      if (userFound.status == "inactive") {
        const statusUpdated = await userDbController.Auth.verifyUser(userFound);
        if (statusUpdated[0] != 0 && statusUpdated != undefined && statusUpdated != null) {
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
    if (headers.hasOwnProperty("authtoken")) {
      //check authentication
      const findSession = await userDbController.Auth.session.findSession(
        headers.authtoken
      );

      if (findSession != null && findSession != undefined && Object.keys(findSession).length != 0) {
        //decrypt token
        var plain = CryptoJS.AES.decrypt(findSession.token, configs.passwordSecret);
        findSession.token = plain.toString(CryptoJS.enc.Utf8);

        const decoded = await authentications.verifyUserJWT(findSession.token);

        if (decoded != null && decoded != undefined && decoded.status == "active") {
          const foundUser = await userDbController.Customer.checkUserExists(
            decoded
          );
          // !=null && !=undefned - true
          if (foundUser != null && foundUser != undefined && Object.keys(foundUser).length != 0) {
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
};
