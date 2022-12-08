import { ApplicationResponse } from "../../core/inc/response/ApplicationResponse.js";
import { ApplicationResult } from "../../core/result.js";
import { authMiddleware } from "../middleware/auth.Middleware.js";

export const adminAuthenticate = async (req, res, next) => {
  authMiddleware.Admin.verifyAdmin(req)
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
//validate request for react App
export const adminTokenAuthenticate = async (req, res, next) => {
  authMiddleware.Admin.verifyAdmin(req)
    .then((data) => {
      req.token = data;
      res.send("valid");
    })
    .catch((error) => {
      ApplicationResponse.error(error, null, (response) => {
        res.status(response.status).json(response);
      });
    });
};

export const adminLogin = async (req, res) => {
  const ipv4 = req.socket.remoteAddress?.split("f:")[1];
  const ipv = req.socket.remoteAddress;
  const browser = req.get("User-Agent");
  const deviceInfo = {
    ip: ipv4,
    ipv: ipv,
    userAgent: browser,
  };
  authMiddleware.Admin.adminLogin(req, deviceInfo)
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

export const adminLogout = async (req, res) => {
  authMiddleware.Admin.adminLogout(req)
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

export const adminSessions = {
  getSession: async (req, res) => {
    authMiddleware.Admin.fetchSession(req)
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

  destroySession: async (req, res) => {
    authMiddleware.Admin.destroySession(req)
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

export const adminRegister = async (req, res) => {
  authMiddleware.Admin.adminRegister(req)
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

export const viewProfile = async (req, res) => {
  authMiddleware.Admin.viewProfile(req)
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
