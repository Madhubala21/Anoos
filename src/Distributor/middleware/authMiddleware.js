import require from "requirejs";
var CryptoJS = require("crypto-js");
import * as Error from "../../core/errors/ErrorConstant.js";
import { authentications } from "../../core/utils/jwt.js";
import { PayloadCompiler } from "../../core/inc/access/PayloadCompiler.js";
import { distributorDbController } from "../../core/database/Controller/distributorDbController.js";

export class authMiddleware {}

authMiddleware.User = {
  distributorLogin: async ({ body }, device) => {
    // const validated = await PayloadCompiler.compile(body, "userLogin");
    const userFound = await distributorDbController.Auth.checkemailExists(body);
    const passwordSecret = await configs.passwordSecret;
    // if (!userFound || Object.keys(userFound).length === 0) {
    if (
      userFound === null ||
      userFound === undefined ||
      Object.keys(userFound).length === 0
    ) {
      //no user available shouldnt be displayed to user
      throw Error.SomethingWentWrong("Wrong Email/Password. Try Again!");
    } else if (userFound.status === "terminated") {
      throw Error.SomethingWentWrong("Account Terminated");
    } else if (userFound.status === "inactive") {
      //send mail to activate account
      throw Error.SomethingWentWrong("Account InActive");
    } else if (userFound.status === "active") {
      try {
        const plain = await CryptoJS.AES.decrypt(
          userFound.password,
          passwordSecret
        );
        const decrypted = plain.toString(CryptoJS.enc.Utf8);
        console.log("decrypted", decrypted);
        if (decrypted === body.password) {
          const token = await authentications.generateUserJWT({
            userId: userFound.id,
            status: "active",
          });
          if (token) {
            var encryptedToken = CryptoJS.AES.encrypt(
              token,
              passwordSecret
            ).toString();
            const addSession =
              await distributorDbController.Auth.session.createSession(
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
          throw Error.SomethingWentWrong("Wrong Email/Password.Try Again!");
        }
      } catch (error) {
        throw Error.SomethingWentWrong("Wrong Email/Password. Try Again!");
      }
    } else {
      throw Error.SomethingWentWrong();
    }
  },
  // distributorLogin: async ({ body }, device) => {
  //   // if (device.latLong==null||device.latLong==undefined||device.latLong.length==0) {
  //   //     throw Error.AuthenticationFailed();
  //   // }
  //   // console.log("body", body);
  //   // console.log("body.latLong", body.latLong);
  //   device.latLong = JSON.stringify(body.latLong);
  //   const passwordSecret = configs.passwordSecret;
  //   const userFound = await distributorDbController.Auth.checkemailExists(body);
  //   // console.log("userFound", userFound);
  //   if (
  //     userFound === null ||
  //     userFound === undefined ||
  //     Object.keys(userFound).length === 0
  //   ) {
  //     //no user available shouldnt be displayed to user
  //     return "Wrong Email/Password. Try Again!";
  //   } else if (userFound.status === "terminated") {
  //     throw Error.AuthenticationFailed("Terminated");
  //   } else if (userFound.status === "inactive") {
  //     throw Error.AuthenticationFailed("Account InActive");
  //   } else if (userFound.type === "USER") {
  //     throw Error.AuthenticationFailed("Account InActive");
  //   } else if (userFound.status === "active" && userFound.type === "ROOT") {
  //     try {
  //       //decrypt password

  //       const plain = await CryptoJS.AES.decrypt(
  //         userFound.password,
  //         passwordSecret
  //       );
  //       const decrypted = plain.toString(CryptoJS.enc.Utf8);
  //       //password matched
  //       if (decrypted === body.password) {
  //         //get last session
  //         const findSession =
  //           await distributorDbController.Auth.session.findSession(userFound);
  //         console.log("findSession", findSession);
  //         if (
  //           findSession == null ||
  //           findSession == undefined ||
  //           Object.keys(findSession).length == 0 ||
  //           findSession.status === "inactive"
  //         ) {
  //           // if session not available,generate new session...!
  //           const token = await authentications.generateAdminJWT({
  //             userId: userFound.id,
  //             status: "active",
  //             type: "ROOT",
  //           });
  //           // console.log("token", token);
  //           if (token != null && token != undefined) {
  //             var encryptedToken = CryptoJS.AES.encrypt(
  //               token,
  //               passwordSecret
  //             ).toString();
  //             console.log("encryptedToken", encryptedToken);
  //             const addSession =
  //               await adminDbController.Auth.session.createSession(
  //                 encryptedToken,
  //                 device,
  //                 userFound.id
  //               );
  //             console.log("addSession", addSession);
  //             if (
  //               addSession != null &&
  //               addSession != undefined &&
  //               Object.keys(addSession).length != 0
  //             ) {
  //               return { token: encryptedToken };
  //             } else {
  //               throw Error.SomethingWentWrong("Failed to Create Session");
  //             }
  //           }
  //         } else if (findSession.status == "active") {
  //           // if session available,destroy existing and generate new...!
  //           const destroySession =
  //             await adminDbController.Auth.session.destroySession(
  //               findSession.token
  //             );
  //           if (destroySession[0] != 0) {
  //             // "Logout Successful";
  //             const token = await authentications.generateAdminJWT({
  //               userId: userFound.id,
  //               status: "active",
  //               type: "ROOT",
  //             });
  //             if (token != null && token != undefined) {
  //               var encryptedToken = CryptoJS.AES.encrypt(
  //                 token,
  //                 passwordSecret
  //               ).toString();
  //               const addSession =
  //                 await adminDbController.Auth.session.createSession(
  //                   encryptedToken,
  //                   device,
  //                   userFound.id
  //                 );
  //               if (addSession != null && addSession != undefined) {
  //                 return { token: encryptedToken };
  //               } else {
  //                 throw Error.SomethingWentWrong("Failed to Create Session");
  //               }
  //             }
  //             // else {
  //             //     throw Error.SomethingWentWrong("fsdffwhgsvfev");
  //             // }
  //           }
  //         } else {
  //           throw Error.AuthenticationFailed("Session Timed Out");
  //         }
  //       } else {
  //         return "Wrong Email/Password. Try Again!";
  //       }
  //     } catch (error) {
  //       console.log("bala");
  //       throw Error.SomethingWentWrong("Server Error");
  //     }
  //   } else {
  //     throw Error.SomethingWentWrong("Try Again Later");
  //   }
  // },
  forgotPassword: async ({ body }) => {
    const userFound = await distributorDbController.Auth.checkemailExists(body);
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

        const generateUid = await distributorDbController.Auth.createUid(
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
    const fetched = await distributorDbController.Auth.checkemailExists(body);
    if (fetched.length != 0 && fetched != null && fetched != undefined) {
      var currentTime = Number(Date.now());
      var expiryMinutes = Number(300000); //5 mins
      var expiryTime = Number(fetched.expiry);
      var initiatedTime = expiryTime - expiryMinutes;
      var expired = currentTime - initiatedTime;
      if (expired <= expiryMinutes) {
        //expired should be lessthan or equal to 30,000
        const verifiedData = await distributorDbController.Auth.verifyOtp(body);
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
          const updatedData = await distributorDbController.Auth.updatePassword(
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
          await distributorDbController.Auth.session.destroySession(
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
      const userFound = await distributorDbController.Customer.checkUserExists(
        decodedEmailToken
      );
      if (userFound.status == "inactive") {
        const statusUpdated = await distributorDbController.Auth.verifyUser(
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
    if (headers.hasOwnProperty("distributortoken")) {
      //check authentication
      const findSession =
        await distributorDbController.Auth.session.findSession(
          headers.authtoken
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
            await distributorDbController.Customer.checkUserExists(decoded);
          // !=null && !=undefned - true
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
};
