import require from "requirejs";
var CryptoJS = require("crypto-js");
import * as Error from "../../core/errors/ErrorConstant.js";
import { authentications } from "../../core/utils/jwt.js";
import { adminDbController } from "../../core/database/Controller/adminDbController.js";
import { PayloadCompiler } from "../../core/inc/access/PayloadCompiler.js";

export class authMiddleware {}

authMiddleware.Admin = {
  adminLogin: async ({ body }, device) => {
    // if (device.latLong==null||device.latLong==undefined||device.latLong.length==0) {
    //     throw Error.AuthenticationFailed();
    // }
    // console.log("body", body);
    // console.log("body.latLong", body.latLong);
    device.latLong = JSON.stringify(body.latLong);
    const passwordSecret = configs.passwordSecret;
    const userFound = await adminDbController.Auth.checkAdminExistsLogin(body);
    // console.log("userFound", userFound);
    if (
      userFound === null ||
      userFound === undefined ||
      Object.keys(userFound).length === 0
    ) {
      //no user available shouldnt be displayed to user
      return "Wrong Email/Password. Try Again!";
    } else if (userFound.status === "terminated") {
      throw Error.AuthenticationFailed("Terminated");
    } else if (userFound.status === "inactive") {
      throw Error.AuthenticationFailed("Account InActive");
    } else if (userFound.type === "USER") {
      throw Error.AuthenticationFailed("Account InActive");
    } else if (userFound.status === "active" && userFound.type === "ROOT") {
      try {
        //decrypt password

        const plain = await CryptoJS.AES.decrypt(
          userFound.password,
          passwordSecret
        );
        const decrypted = plain.toString(CryptoJS.enc.Utf8);
        //password matched
        if (decrypted === body.password) {
          //get last session
          const findSession =
            await adminDbController.Auth.session.findSessionId(userFound);
          console.log("findSession", findSession);
          if (
            findSession == null ||
            findSession == undefined ||
            Object.keys(findSession).length == 0 ||
            findSession.status === "inactive"
          ) {
            // if session not available,generate new session...!
            const token = await authentications.generateAdminJWT({
              userId: userFound.id,
              status: "active",
              type: "ROOT",
            });
            // console.log("token", token);
            if (token != null && token != undefined) {
              var encryptedToken = CryptoJS.AES.encrypt(
                token,
                passwordSecret
              ).toString();
              console.log("encryptedToken", encryptedToken);
              const addSession =
                await adminDbController.Auth.session.createSession(
                  encryptedToken,
                  device,
                  userFound.id
                );
              console.log("addSession", addSession);
              if (
                addSession != null &&
                addSession != undefined &&
                Object.keys(addSession).length != 0
              ) {
                return { token: encryptedToken };
              } else {
                throw Error.SomethingWentWrong("Failed to Create Session");
              }
            }
          } else if (findSession.status == "active") {
            // if session available,destroy existing and generate new...!
            const destroySession =
              await adminDbController.Auth.session.destroySession(
                findSession.token
              );
            if (destroySession[0] != 0) {
              // "Logout Successful";
              const token = await authentications.generateAdminJWT({
                userId: userFound.id,
                status: "active",
                type: "ROOT",
              });
              if (token != null && token != undefined) {
                var encryptedToken = CryptoJS.AES.encrypt(
                  token,
                  passwordSecret
                ).toString();
                const addSession =
                  await adminDbController.Auth.session.createSession(
                    encryptedToken,
                    device,
                    userFound.id
                  );
                if (addSession != null && addSession != undefined) {
                  return { token: encryptedToken };
                } else {
                  throw Error.SomethingWentWrong("Failed to Create Session");
                }
              }
              // else {
              //     throw Error.SomethingWentWrong("fsdffwhgsvfev");
              // }
            }
          } else {
            throw Error.AuthenticationFailed("Session Timed Out");
          }
        } else {
          return "Wrong Email/Password. Try Again!";
        }
      } catch (error) {
        console.log("bala");
        throw Error.SomethingWentWrong("Server Error");
      }
    } else {
      throw Error.SomethingWentWrong("Try Again Later");
    }
  },
  adminRegister: async ({ body }) => {
    const passwordSecret = configs.passwordSecret;
    const accoundFound = await adminDbController.Auth.checkAdminExistsRegister(
      body
    );

    if (
      accoundFound != null &&
      accoundFound != undefined &&
      Object.keys(accoundFound).length != 0
    ) {
      if (
        accoundFound.status === "inactive" ||
        accoundFound.status === "terminated"
      ) {
        return "Admin already exists account inactive or terminated";
      } else {
        return "Admin already exists";
      }
    } else {
      body.password = CryptoJS.AES.encrypt(
        body.password,
        passwordSecret
      ).toString();
      // schema
      const validated = await PayloadCompiler.compile(body, "AdminCreate");

      const adminCreated = await adminDbController.Admin.createAdmin(
        validated.data
      );
      if (
        adminCreated != null &&
        adminCreated != undefined &&
        Object.keys(adminCreated).length != 0
      ) {
        return "Account Created";
      } else {
        throw Error.SomethingWentWrong("sdw");
      }
    }
  },
  viewProfile: async ({ token }) => {
    // console.log("token", token);
    const accoundFound = await adminDbController.Admin.viewAdminProfile(token);
    if (accoundFound != null && accoundFound != undefined) {
      return accoundFound;
    } else {
      return "Data not found";
    }
  },
  fetchSession: async ({ token }) => {
    const accoundFound = await adminDbController.Auth.session.findMySession(
      token
    );
    if (accoundFound != null && accoundFound != undefined) {
      return accoundFound;
    } else {
      return "No Sessions Found";
    }
  },
  destroySession: async ({ body }) => {
    const checkSession = await adminDbController.Auth.session.findSessionById(
      body
    );
    if (checkSession.status === "active") {
      return "Unable to Delete an Active Session";
    } else {
      const destroyed = await adminDbController.Auth.session.deleteSession(
        body
      );
      if (destroyed[0] != 0) {
        return "Session Deleted";
      } else {
        return "Unable to Delete";
      }
    }
  },
  adminLogout: async ({ headers }) => {
    try {
      if (headers.hasOwnProperty("adminauthtoken")) {
        const findSession = await adminDbController.Auth.session.findSession(
          headers.adminauthtoken
        );
        if (
          findSession != null &&
          findSession != undefined &&
          Object.keys(findSession).length != 0 &&
          findSession.status === "active"
        ) {
          const signOutUser =
            await adminDbController.Auth.session.destroySession(
              headers.adminauthtoken
            );
          if (Boolean(signOutUser[0]) == true) {
            return "Logout Successful";
          } else {
            return "Logout UnSuccessful";
          }
        } else if (findSession.status === "inactive") {
          return "Already Logged Out";
        } else {
          return "Already Logged Out";
        }
      } else {
        throw Error.SomethingWentWrong();
      }
    } catch (error) {
      throw Error.SomethingWentWrong("Server Error");
    }
  },
  verifyAdmin: async ({ headers }) => {
    var isMalicious = true;
    if (headers.hasOwnProperty("adminauthtoken")) {
      //check authentication
      const passwordSecret = configs.passwordSecret;
      const findSession = await adminDbController.Auth.session.findSession(
        headers.adminauthtoken
      );
      if (
        findSession != null &&
        findSession != undefined &&
        Object.keys(findSession).length != 0 &&
        findSession.status == "active"
      ) {
        //decrypt token
        var plain = CryptoJS.AES.decrypt(findSession.token, passwordSecret);
        findSession.token = plain.toString(CryptoJS.enc.Utf8);

        //decode token
        const decoded = await authentications.verifyAdminJWT(findSession.token);
        if (
          decoded != null &&
          decoded != undefined &&
          decoded.status == "active" &&
          decoded.type == "ROOT"
        ) {
          const foundUser = await adminDbController.Auth.checkUserIdExists(
            decoded
          );
          if (
            foundUser != null &&
            foundUser != undefined &&
            Object.keys(foundUser).length != 0
          ) {
            return foundUser;
          } else {
            throw Error.AuthenticationFailed();
          }
        } else {
          //inactive token if expired null || undefined
          const findSession =
            await adminDbController.Auth.session.destroySession(
              headers.adminauthtoken
            );
          if (findSession[0] == 1) {
            throw Error.AuthenticationFailed("Session Timed Out");
          }
          // throw AuthenticationFailed();
        }
      } else {
        throw Error.AuthenticationFailed();
      }
    }
    if (isMalicious) {
      throw Error.AuthenticationFailed("Malicious Token");
    }
  },
};
