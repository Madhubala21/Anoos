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

const store = {
  properties: {
    storeId: {
      $ref: "defs#/definitions/store/storeId",
    },
    image: {
      $ref: "defs#/definitions/store/image",
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
    pincode: {
      $ref: "defs#/definitions/store/pincode",
    },
    paymentMethod: {
      $ref: "defs#/definitions/store/paymentMethod",
    },
    status: {
      $ref: "defs#/definitions/store/status",
    },
  },
};

const order = {
  properties: {
    orderId: {
      $ref: "defs#/definitions/order/orderId",
    },
    productName: {
      $ref: "defs#/definitions/order/productName",
    },
    quantity: {
      $ref: "defs#/definitions/order/quantity",
    },
    amount: {
      $ref: "defs#/definitions/order/amount",
    },
    orderStatus: {
      $ref: "defs#/definitions/order/orderStatus",
    },
    status: {
      $ref: "defs#/definitions/order/status",
    },
  },
};

const expense = {
  properties: {
    expenseId: {
      $ref: "defs#/definitions/expense/expenseId",
    },
    petrol: {
      $ref: "defs#/definitions/expense/petrol",
    },
    tea: {
      $ref: "defs#/definitions/expense/tea",
    },
    food: {
      $ref: "defs#/definitions/expense/food",
    },
    repair: {
      $ref: "defs#/definitions/expense/repair",
    },
    others: {
      $ref: "defs#/definitions/expense/others",
    },
    total: {
      $ref: "defs#/definitions/expense/total",
    },
  },
};

const delivery = {
  properties: {
    deliveryId: {
      $ref: "defs#/definitions/delivery/deliveryId",
    },
    productName: {
      $ref: "defs#/definitions/delivery/productName",
    },
    quantity: {
      $ref: "defs#/definitions/delivery/quantity",
    },
    price: {
      $ref: "defs#/definitions/delivery/price",
    },
  },
};

const stock = {
  properties: {
    stockId: {
      $ref: "defs#/definitions/stock/stockId",
    },
    stockName: {
      $ref: "defs#/definitions/stock/stockName",
    },
    quantity: {
      $ref: "defs#/definitions/stock/quantity",
    },
    stockLimit: {
      $ref: "defs#/definitions/stock/stockLimit",
    },
    status: {
      $ref: "defs#/definitions/stock/status",
    },
  },
};

// export const userLogin = {
//   type: "object",
//   $id: "userLogin",
//   additionalProperties: false,
//   properties: {
//     email: Customer.properties.email,
//     password: Customer.properties.password,
//   },
//   required: ["email", "password"],
// };

// export const sendEmail = {
//   type: "object",
//   $id: "sendEmail",
//   additionalProperties: false,
//   properties: {
//     email: Customer.properties.email,
//     code: Customer.properties.code,
//     password: Customer.properties.password,
//   },
//   required: ["email", "password"],
// };

// export const verifyLogin = {
//   type: "object",
//   $id: "verifyLogin",
//   additionalProperties: false,
//   properties: {
//     email: Customer.properties.email,
//     code: Customer.properties.code,
//     password: Customer.properties.password,
//   },
//   required: ["email", "password"],
// };

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

export const storeCreate = {
  type: "object",
  $id: "storeCreate",
  additionalProperties: false,
  properties: {
    image: store.properties.image,
    name: store.properties.name,
    streetName: store.properties.streetName,
    city: store.properties.city,
    districtName: store.properties.districtName,
    phone: store.properties.phone,
    email: store.properties.email,
    gstNumber: store.properties.gstNumber,
    doorNumber: store.properties.doorNumber,
    pincode: store.properties.pincode,
    paymentMethod: store.properties.paymentMethod,
  },
  required: [
    // "image",
    "name",
    "streetName",
    "city",
    "districtName",
    "phone",
    "email",
    "gstNumber",
    "doorNumber",
    "pincode",
    "paymentMethod",
  ],
};

export const orderCreate = {
  type: "object",
  $id: "orderCreate",
  additionalProperties: false,
  properties: {
    productName: order.properties.productName,
    quantity: order.properties.quantity,
    amount: order.properties.amount,
    orderStatus: order.properties.orderStatus,
    status: order.properties.status,
  },
  required: ["productName", "quantity", "amount"],
};

export const expenseCreate = {
  type: "object",
  $id: "expenseCreate",
  additionalProperties: false,
  properties: {
    petrol: expense.properties.petrol,
    tea: expense.properties.tea,
    food: expense.properties.food,
    repair: expense.properties.repair,
    others: expense.properties.others,
    total: expense.properties.total,
  },
  required: ["petrol", "tea", "food", "repair", "others"],
};

export const deliveryCreate = {
  type: "object",
  $id: "deliveryCreate",
  additionalProperties: false,
  properties: {
    productName: delivery.properties.productName,
    quantity: delivery.properties.quantity,
    price: delivery.properties.price,
  },
  required: ["productName", "quantity", "price"],
};

export const stockCreate = {
  type: "object",
  $id: "stockCreate",
  additionalProperties: false,
  properties: {
    stockName: stock.properties.stockName,
    quantity: stock.properties.quantity,
    stockLimit: stock.properties.stockLimit,
    status: stock.properties.status,
  },
  required: ["stockName", "quantity", "stockLimit"],
};
