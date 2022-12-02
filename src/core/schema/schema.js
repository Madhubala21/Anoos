const Admin = {
  properties: {
    adminId: {
      $ref: "defs#/definitions/Admin/adminId",
    },
    username: {
      $ref: "defs#/definitions/Admin/username",
    },
    email: {
      $ref: "defs#/definitions/Admin/email",
    },
    phone: {
      $ref: "defs#/definitions/Admin/phone",
    },
    password: {
      $ref: "defs#/definitions/Admin/password",
    },
    status: {
      $ref: "defs#/definitions/Admin/status",
    },
    adminType: {
      $ref: "defs#/definitions/Admin/adminType",
    },
  },
};

const adminAuth = {
  properties: {
    authId: {
      $ref: "defs#/definitions/adminAuth/authId",
    },
    uid: {
      $ref: "defs#/definitions/adminAuth/uid",
    },
    token: {
      $ref: "defs#/definitions/adminAuth/token",
    },
    ipv4: {
      $ref: "defs#/definitions/adminAuth/ipv4",
    },
    userAgent: {
      $ref: "defs#/definitions/adminAuth/userAgent",
    },
    latLong: {
      $ref: "defs#/definitions/adminAuth/latLong",
    },
    status: {
      $ref: "defs#/definitions/adminAuth/status",
    },
  },
};

const appConfig = {
  properties: {
    configId: {
      $ref: "defs#/definitions/appConfig/configId",
    },
    baseUrl: {
      $ref: "defs#/definitions/appConfig/baseUrl",
    },
    hostEmail: {
      $ref: "defs#/definitions/appConfig/hostEmail",
    },
    placeholder: {
      $ref: "defs#/definitions/appConfig/placeholder",
    },
    shippingFee: {
      $ref: "defs#/definitions/appConfig/shippingFee",
    },
    messagingKey: {
      $ref: "defs#/definitions/appConfig/messagingKey",
    },
    paymentGatewayId: {
      $ref: "defs#/definitions/appConfig/paymentGatewayId",
    },
    paymentGatewaySecret: {
      $ref: "defs#/definitions/appConfig/paymentGatewaySecret",
    },
    paymentCallback: {
      $ref: "defs#/definitions/appConfig/paymentCallback",
    },
    passwordSecret: {
      $ref: "defs#/definitions/appConfig/passwordSecret",
    },
    jwtClientSecret: {
      $ref: "defs#/definitions/appConfig/jwtClientSecret",
    },
    jwtAdminSecret: {
      $ref: "defs#/definitions/appConfig/jwtAdminSecret",
    },
    jwtEmailSecret: {
      $ref: "defs#/definitions/appConfig/jwtEmailSecret",
    },
    status: {
      $ref: "defs#/definitions/appConfig/status",
    },
  },
};

const Banner = {
  properties: {
    bannerId: {
      $ref: "defs#/definitions/Banner/bannerId",
    },
    bannerImage: {
      $ref: "defs#/definitions/Banner/bannerImage",
    },
    bannerType: {
      $ref: "defs#/definitions/Banner/bannerType",
    },
    bannerFor: {
      $ref: "defs#/definitions/Banner/bannerFor",
    },
    productOrCategoryId: {
      $ref: "defs#/definitions/Banner/productOrCategoryId",
    },
    status: {
      $ref: "defs#/definitions/Banner/status",
    },
  },
};

const distributor = {
  properties: {
    distributorId: {
      $ref: "defs#/definitions/distributor/distributorId",
    },
    username: {
      $ref: "defs#/definitions/distributor/username",
    },
    email: {
      $ref: "defs#/definitions/distributor/email",
    },
    phone: {
      $ref: "defs#/definitions/distributor/phone",
    },
    password: {
      $ref: "defs#/definitions/distributor/password",
    },
    status: {
      $ref: "defs#/definitions/distributor/status",
    },
    adminType: {
      $ref: "defs#/definitions/distributor/adminType",
    },
  },
};

const distributorAuth = {
  properties: {
    distributorId: {
      $ref: "defs#/definitions/distributorAuth/distributorId",
    },
    token: {
      $ref: "defs#/definitions/distributorAuth/token",
    },
    ipv4: {
      $ref: "defs#/definitions/distributorAuth/ipv4",
    },
    userAgent: {
      $ref: "defs#/definitions/distributorAuth/userAgent",
    },
    status: {
      $ref: "defs#/definitions/distributorAuth/status",
    },
  },
};

const store = {
  properties: {
    storeId: {
      $ref: "defs#/definitions/store/storeId",
    },
    name: {
      $ref: "defs#/definitions/store/name",
    },
    streetName: {
      $ref: "defs#/definitions/store/streetName",
    },
    city: {
      $ref: "defs#/definitions/store/city",
    },
    districtName: {
      $ref: "defs#/definitions/store/districtName",
    },
    phone: {
      $ref: "defs#/definitions/store/phone",
    },
    email: {
      $ref: "defs#/definitions/store/email",
    },
    gstNumber: {
      $ref: "defs#/definitions/store/gstNumber",
    },
    doorNumber: {
      $ref: "defs#/definitions/store/doorNumber",
    },
    pinCode: {
      $ref: "defs#/definitions/store/pinCode",
    },
  },
};

const production = {
  properties: {
    productionId: {
      $ref: "defs#/definitions/production/productionId",
    },
    username: {
      $ref: "defs#/definitions/production/username",
    },
    email: {
      $ref: "defs#/definitions/production/email",
    },
    phone: {
      $ref: "defs#/definitions/production/phone",
    },
    password: {
      $ref: "defs#/definitions/production/password",
    },
    status: {
      $ref: "defs#/definitions/production/status",
    },
    adminType: {
      $ref: "defs#/definitions/production/adminType",
    },
  },
};

const productionAuth = {
  properties: {
    productionId: {
      $ref: "defs#/definitions/productionAuth/productionId",
    },
    token: {
      $ref: "defs#/definitions/productionAuth/token",
    },
    ipv4: {
      $ref: "defs#/definitions/productionAuth/ipv4",
    },
    userAgent: {
      $ref: "defs#/definitions/productionAuth/userAgent",
    },
    status: {
      $ref: "defs#/definitions/productionAuth/status",
    },
  },
};

export const userLogin = {
  type: "object",
  $id: "userLogin",
  additionalProperties: false,
  properties: {
    email: Customer.properties.email,
    password: Customer.properties.password,
  },
  required: ["email", "password"],
};

export const sendEmail = {
  type: "object",
  $id: "sendEmail",
  additionalProperties: false,
  properties: {
    email: Customer.properties.email,
    code: Customer.properties.code,
    password: Customer.properties.password,
  },
  required: ["email", "password"],
};

export const verifyLogin = {
  type: "object",
  $id: "verifyLogin",
  additionalProperties: false,
  properties: {
    email: Customer.properties.email,
    code: Customer.properties.code,
    password: Customer.properties.password,
  },
  required: ["email", "password"],
};

export const AdminCreate = {
  type: "object",
  $id: "AdminCreate",
  additionalProperties: false,
  properties: {
    username: Admin.properties.username,
    email: Admin.properties.email,
    password: Admin.properties.password,
    phone: Admin.properties.phone,
  },
  required: ["username", "email", "password", "phone"],
};

export const distributorCreate = {
  type: "object",
  $id: "distributorCreate",
  additionalProperties: false,
  properties: {
    username: distributor.properties.username,
    email: distributor.properties.email,
    password: distributor.properties.password,
    phone: distributor.properties.phone,
  },
  required: ["username", "email", "password", "phone"],
};

export const productionCreate = {
  type: "object",
  $id: "productionCreate",
  additionalProperties: false,
  properties: {
    username: production.properties.username,
    email: production.properties.email,
    password: production.properties.password,
    phone: production.properties.phone,
  },
  required: ["username", "email", "password", "phone"],
};
