import { ApplicationResponse } from "../../core/inc/response/ApplicationResponse.js";
import { ApplicationResult } from "../../core/result.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import dotenv from "dotenv";
dotenv.config();
/**
 * @name Email Login
 * @param {*} body
 */

export const emailLogin = async (req, res) => {
  const ipv4 = req.socket.remoteAddress?.split("f:")[1];
  const ipv = req.socket.remoteAddress;
  const browser = req.get("User-Agent");
  const deviceInfo = { ip: ipv4, ipv: ipv, userAgent: browser };
  authMiddleware.User.email_login(req, deviceInfo)
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
};


/**
 * @name logout user
 * @param {*} body
 */

export const logout = async (req, res) => {
  authMiddleware.User.signOut(req)
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
};

/**
 * @name Generate code and send mail
 * @param {*} body
 */

export const Forgot = async (req, res) => {
  authMiddleware.User.forgotPassword(req)
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
};

/**
 * @name Verify Email & code &update password
 * @param {*} body
 */

export const verifyCode = async (req, res) => {
  authMiddleware.User.verifyEmailCode(req)
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
};


export const getStarted = async (req, res) => {
  authMiddleware.User.get_started(req)
    .then((data) => {
      const response = ApplicationResult.forCreated();
      var statuscode = 0;
      ApplicationResponse.success(response, null, (response) => (statuscode = response.status));
      const statusmessage = data;
      if (statusmessage == "Account Verified" || statusmessage == "Account already Verified") {
        res.render("accountverified", { message: data, name: process.env.APP_NAME });
      } else if (statusmessage == "Token Expired ! Try Again") {
        res.render("401", { message: "Link Expired ! Signup Again", name: process.env.APP_NAME });
      } else {
        res.render("contactadmin", { message: data, name: process.env.APP_NAME });
      }
      // res.json({ status: statuscode, data: data });
    })
    .catch((error) => {
      ApplicationResponse.error(error, null, (response) => {
        res.status(response.status).json(response);
      });
    });
};

/**
 * @name Authentication Middleware
 * @param {*} body
 */

export const UserAuthenticate = async (req, res, next) => {
  authMiddleware.User.verify(req)
    .then((data) => {
      req.token = data;
      next();
    })
    .catch((error) => {
      ApplicationResponse.error(error, null, (response) => {
        res.status(response.status).json(response);
      });
    });
};
