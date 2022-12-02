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
    user: {
      $ref: "defs#/definitions/adminAuth/user",
    },
    latLong: {
      $ref: "defs#/definitions/adminAuth/latLong",
    },
    status: {
      $ref: "defs#/definitions/adminAuth/status",
    },
  },
};
const homeLayout = {
  properties: {
    layout: {
      $ref: "defs#/definitions/homeLayout/layout",
    },
    value: {
      $ref: "defs#/definitions/homeLayout/value",
    },
    icons: {
      $ref: "defs#/definitions/homeLayout/icons",
    },
  },
};
const Customer = {
  properties: {
    CustomerId: {
      $ref: "defs#/definitions/Customer/customerId",
    },
    code: {
      $ref: "defs#/definitions/Customer/code",
    },
    expiry: {
      $ref: "defs#/definitions/Customer/expiry",
    },
    userName: {
      $ref: "defs#/definitions/Customer/userName",
    },
    password: {
      $ref: "defs#/definitions/Customer/password",
    },
    alaisName: {
      $ref: "defs#/definitions/Customer/alaisName",
    },
    email: {
      $ref: "defs#/definitions/Customer/email",
    },
    fcmToken: {
      $ref: "defs#/definitions/Customer/fcmToken",
    },
    phone: {
      $ref: "defs#/definitions/Customer/phone",
    },
    dob: {
      $ref: "defs#/definitions/Customer/dob",
    },
    gender: {
      $ref: "defs#/definitions/Customer/gender",
    },
    isMailVerified: {
      $ref: "defs#/definitions/Customer/isMailVerified",
    },
    isPhoneVerified: {
      $ref: "defs#/definitions/Customer/isPhoneVerified",
    },
    status: {
      $ref: "defs#/definitions/Customer/status",
    },
  },
};
const shippingAddress = {
  properties: {
    addressId: {
      $ref: "defs#/definitions/shippingAddress/addressId",
    },
    customerId: {
      $ref: "defs#/definitions/shippingAddress/customerId",
    },
    state: {
      $ref: "defs#/definitions/shippingAddress/state",
    },
    district: {
      $ref: "defs#/definitions/shippingAddress/district",
    },
    city: {
      $ref: "defs#/definitions/shippingAddress/city",
    },
    street: {
      $ref: "defs#/definitions/shippingAddress/street",
    },
    landmark: {
      $ref: "defs#/definitions/shippingAddress/landmark",
    },
    zipcode: {
      $ref: "defs#/definitions/shippingAddress/zipcode",
    },
    addressType: {
      $ref: "defs#/definitions/shippingAddress/addressType",
    },
    primary: {
      $ref: "defs#/definitions/shippingAddress/primary",
    },
    status: {
      $ref: "defs#/definitions/shippingAddress/status",
    },
  },
};
const userAuth = {
  properties: {
    authId: {
      $ref: "defs#/definitions/userAuth/authId",
    },
    token: {
      $ref: "defs#/definitions/userAuth/token",
    },
    ipv4: {
      $ref: "defs#/definitions/userAuth/ipv4",
    },
    userAgent: {
      $ref: "defs#/definitions/userAuth/userAgent",
    },
  },
};
const Taxes = {
  properties: {
    taxId: {
      $ref: "defs#/definitions/Taxes/taxId",
    },
    taxPercentage: {
      $ref: "defs#/definitions/Taxes/taxPercentage",
    },
    status: {
      $ref: "defs#/definitions/Taxes/status",
    },
  },
};

const Category = {
  properties: {
    categoryId: {
      $ref: "defs#/definitions/Category/categoryId",
    },
    categoryName: {
      $ref: "defs#/definitions/Category/categoryName",
    },
    categoryImage: {
      $ref: "defs#/definitions/Category/categoryImage",
    },
    taxId: {
      $ref: "defs#/definitions/Category/taxId",
    },
    taxPercentage: {
      $ref: "defs#/definitions/Category/taxPercentage",
    },
    status: {
      $ref: "defs#/definitions/Category/status",
    },
  },
};
const Product = {
  properties: {
    productId: {
      $ref: "defs#/definitions/Product/productId",
    },
    categoryId: {
      $ref: "defs#/definitions/Product/categoryId",
    },
    categoryName: {
      $ref: "defs#/definitions/Product/categoryName",
    },
    tax: {
      $ref: "defs#/definitions/Product/tax",
    },
    productImage: {
      $ref: "defs#/definitions/Product/productImage",
    },
    productName: {
      $ref: "defs#/definitions/Product/productName",
    },
    productDescription: {
      $ref: "defs#/definitions/Product/productDescription",
    },
    moreInfo: {
      $ref: "defs#/definitions/Product/moreInfo",
    },
    tags: {
      $ref: "defs#/definitions/Product/tags",
    },
    availableLocations: {
      $ref: "defs#/definitions/Product/availableLocations",
    },
    blogLimit: {
      $ref: "defs#/definitions/Product/blogLimit",
    },
    status: {
      $ref: "defs#/definitions/Product/status",
    },
  },
};
const Variant = {
  properties: {
    variantId: {
      $ref: "defs#/definitions/Variant/variantId",
    },
    productId: {
      $ref: "defs#/definitions/Variant/productId",
    },
    productName: {
      $ref: "defs#/definitions/Variant/productName",
    },
    variantName: {
      $ref: "defs#/definitions/Variant/variantName",
    },
    variantImage: {
      $ref: "defs#/definitions/Variant/variantImage",
    },
    altTags: {
      $ref: "defs#/definitions/Variant/altTags",
    },
    variantColor: {
      $ref: "defs#/definitions/Variant/variantColor",
    },
    isColor: {
      $ref: "defs#/definitions/Variant/isColor",
    },
    actualPrice: {
      $ref: "defs#/definitions/Variant/actualPrice",
    },
    discountPrice: {
      $ref: "defs#/definitions/Variant/discountPrice",
    },
    tax: {
      $ref: "defs#/definitions/Variant/tax",
    },
    availableStock: {
      $ref: "defs#/definitions/Variant/availableStock",
    },
    alternateStock: {
      $ref: "defs#/definitions/Variant/alternateStock",
    },
    status: {
      $ref: "defs#/definitions/Variant/status",
    },
  },
};
const ProductBlog = {
  properties: {
    blogId: {
      $ref: "defs#/definitions/ProductBlog/BlogId",
    },
    productId: {
      $ref: "defs#/definitions/ProductBlog/productId",
    },
    sectionImage: {
      $ref: "defs#/definitions/ProductBlog/sectionImage",
    },
  },
};
const Title = {
  properties: {
    specId: {
      $ref: "defs#/definitions/Title/specId",
    },
    categoryId: {
      $ref: "defs#/definitions/Title/categoryId",
    },
    ProductTitle: {
      $ref: "defs#/definitions/Title/ProductTitle",
    },
  },
};
const Specifications = {
  properties: {
    specId: {
      $ref: "defs#/definitions/Specifications/specId",
    },
    productId: {
      $ref: "defs#/definitions/Specifications/productId",
    },
    productSpecification: {
      $ref: "defs#/definitions/Specifications/productSpecification",
    },
  },
};
const Wishlist = {
  properties: {
    WishlistId: {
      $ref: "defs#/definitions/Wishlist/WishlistId",
    },
    customerId: {
      $ref: "defs#/definitions/Wishlist/customerId",
    },
    productId: {
      $ref: "defs#/definitions/Wishlist/productId",
    },
  },
};
const Cart = {
  properties: {
    cartId: {
      $ref: "defs#/definitions/Cart/cartId",
    },
    customerId: {
      $ref: "defs#/definitions/Cart/customerId",
    },
    productId: {
      $ref: "defs#/definitions/Cart/productId",
    },
    productName: {
      $ref: "defs#/definitions/Cart/productName",
    },
    variantId: {
      $ref: "defs#/definitions/Cart/variantId",
    },
    variantColor: {
      $ref: "defs#/definitions/Cart/variantColor",
    },
    variantImage: {
      $ref: "defs#/definitions/Cart/variantImage",
    },
    singleProductPrice: {
      $ref: "defs#/definitions/Cart/singleProductPrice",
    },
    actualPrice: {
      $ref: "defs#/definitions/Cart/actualPrice",
    },
    totalPrice: {
      $ref: "defs#/definitions/Cart/totalPrice",
    },
    inclusiveGST: {
      $ref: "defs#/definitions/Cart/inclusiveGST",
    },
    units: {
      $ref: "defs#/definitions/Cart/units",
    },
    index: {
      $ref: "defs#/definitions/Cart/index",
    },
    tax: {
      $ref: "defs#/definitions/Cart/tax",
    },
    status: {
      $ref: "defs#/definitions/Cart/status",
    },
  },
};
const Order = {
  properties: {
    id: {
      $ref: "defs#/definitions/Order/id",
    },
    customerId: {
      $ref: "defs#/definitions/Order/customerId",
    },
    shippingAddress: {
      $ref: "defs#/definitions/Order/shippingAddress",
    },
    cartId: {
      $ref: "defs#/definitions/Order/cartId",
    },
    orderId: {
      $ref: "defs#/definitions/Order/orderId",
    },
    paytmTransactionId: {
      $ref: "defs#/definitions/Order/paytmTransactionId",
    },
    txnToken: {
      $ref: "defs#/definitions/Order/txnToken",
    },
    checksumHash: {
      $ref: "defs#/definitions/Order/checksumHash",
    },
    paymentMode: {
      $ref: "defs#/definitions/Order/paymentMode",
    },
    bankTransactionId: {
      $ref: "defs#/definitions/Order/bankTransactionId",
    },
    txnTimeStamp: {
      $ref: "defs#/definitions/Order/txnTimeStamp",
    },
    txnStatus: {
      $ref: "defs#/definitions/Order/txnStatus",
    },
    totalAmount: {
      $ref: "defs#/definitions/Order/totalAmount",
    },
    paidAmount: {
      $ref: "defs#/definitions/Order/paidAmount",
    },
    reason: {
      $ref: "defs#/definitions/Order/reason",
    },
    paymentStatus: {
      $ref: "defs#/definitions/Order/paymentStatus",
    },
    isReviewed: {
      $ref: "defs#/definitions/Order/isReviewed",
    },
    orderStatus: {
      $ref: "defs#/definitions/Order/orderStatus",
    },
  },
};

const Reviews = {
  properties: {
    reviewId: {
      $ref: "defs#/definitions/Reviews/reviewId",
    },
    orderId: {
      $ref: "defs#/definitions/Reviews/orderId",
    },
    customerId: {
      $ref: "defs#/definitions/Reviews/customerId",
    },
    customerName: {
      $ref: "defs#/definitions/Reviews/customerName",
    },
    productId: {
      $ref: "defs#/definitions/Reviews/productId",
    },
    rating: {
      $ref: "defs#/definitions/Reviews/rating",
    },
    review: {
      $ref: "defs#/definitions/Reviews/review",
    },
    status: {
      $ref: "defs#/definitions/Reviews/status",
    },
  },
};

/**
 * @name  Products
 */

export const categoryId = {
  type: "object",
  $id: "categoryId",
  additionalProperties: false,
  properties: {
    categoryId: Product.properties.categoryId,
  },
  required: ["categoryId"],
};

/**
 * @name  User
 */

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
    email: Admin.properties.email,
    password: Admin.properties.password,
    phone: Admin.properties.phone,
  },
  required: ["email", "password", "phone"],
};

export const appConfigCreate = {
  type: "object",
  $id: "appConfigCreate",
  additionalProperties: false,
  properties: {
    baseUrl: appConfig.properties.baseUrl,
    hostEmail: appConfig.properties.hostEmail,
    messagingKey: appConfig.properties.messagingKey,
    paymentGatewayId: appConfig.properties.paymentGatewayId,
    paymentGatewaySecret: appConfig.properties.paymentGatewaySecret,
    passwordSecret: appConfig.properties.passwordSecret,
    jwtClientSecret: appConfig.properties.jwtClientSecret,
    jwtAdminSecret: appConfig.properties.jwtAdminSecret,
    jwtEmailSecret: appConfig.properties.jwtEmailSecret,
  },
  required: [
    "baseUrl",
    "hostEmail",
    "messagingKey",
    "paymentGatewayId",
    "paymentGatewaySecret",
    "passwordSecret",
    "jwtClientSecret",
    "jwtAdminSecret",
    "jwtEmailSecret",
  ],
};

export const homeLayoutCreate = {
  type: "object",
  $id: "homeLayoutCreate",
  additionalProperties: false,
  properties: {
    layout: homeLayout.properties.layout,
    value: homeLayout.properties.value,
  },
  required: ["layout", "value"],
};

export const CustomerCreate = {
  type: "object",
  $id: "CustomerCreate",
  additionalProperties: false,
  properties: {
    CustomerId: Customer.properties.CustomerId,
    userName: Customer.properties.userName,
    password: Customer.properties.password,
    alaisName: Customer.properties.alaisName,
    email: Customer.properties.email,
    phone: Customer.properties.phone,
    dob: Customer.properties.dob,
    gender: Customer.properties.gender,
  },
  required: [
    "CustomerId",
    "userName",
    "password",
    "alaisName",
    "email",
    "phone",
    "dob",
    "gender",
  ],
};
export const shippingAddressCreate = {
  type: "object",
  $id: "shippingAddressCreate",
  additionalProperties: false,
  properties: {
    addressId: shippingAddress.properties.addressId,
    customerId: shippingAddress.properties.customerId,
    state: shippingAddress.properties.state,
    district: shippingAddress.properties.district,
    city: shippingAddress.properties.city,
    street: shippingAddress.properties.street,
    landmark: shippingAddress.properties.landmark,
    zipcode: shippingAddress.properties.zipcode,
    primary: shippingAddress.properties.primary,
    // status: shippingAddress.properties.status,
  },
  required: [
    "AddressId",
    "customerId",
    "state",
    "district",
    "city",
    "street",
    "landmark",
    "zipcode",
    "primary",
  ],
};
export const TaxesCreate = {
  type: "object",
  $id: "TaxesCreate",
  additionalProperties: false,
  properties: {
    taxId: Taxes.properties.taxId,
    taxPercentage: Taxes.properties.taxPercentage,
    // status: Taxes.properties.status,
  },
  required: ["taxId", "taxPercentage"],
};
export const CategoryCreate = {
  type: "object",
  $id: "CategoryCreate",
  additionalProperties: false,
  properties: {
    categoryId: Category.properties.categoryId,
    categoryName: Category.properties.categoryName,
    taxPercentage: Category.properties.taxPercentage,
    status: Category.properties.status,
  },
  required: ["categoryId", "categoryName", "taxPercentage", "status"],
};
export const ProductCreate = {
  type: "object",
  $id: "ProductCreate",
  additionalProperties: false,
  properties: {
    productId: Product.properties.productId,
    categoryId: Product.properties.categoryId,
    categoryName: Product.properties.categoryName,
    productName: Product.properties.productName,
    productDescription: Product.properties.productDescription,
    tags: Product.properties.tags,
    availableLocations: Product.properties.availableLocations,
    // status: Product.properties.status,
  },
  required: [
    "productId",
    "categoryId",
    "categoryName",
    "productName",
    "productDescription",
    "tags",
    "availableLocations",
  ],
};
export const VariantCreate = {
  type: "object",
  $id: "VariantCreate",
  additionalProperties: false,
  properties: {
    variantId: Variant.properties.variantId,
    productId: Variant.properties.productId,
    productName: Variant.properties.productName,
    variantName: Variant.properties.variantName,
    altTags: Variant.properties.altTags,
    // color: Variant.properties.color,
    actualPrice: Variant.properties.actualPrice,
    discountPrice: Variant.properties.discountPrice,
    availableStock: Variant.properties.availableStock,
    alternateStock: Variant.properties.alternateStock,
    // status: Variant.properties.status,
  },
  required: [
    "variantId",
    "productId",
    "productName",
    "variantName",
    "altTags",
    // "color",
    "actualPrice",
    "discountPrice",
    "availableStock",
    "alternateStock",
  ],
};
export const ProductBlogCreate = {
  type: "object",
  $id: "ProductBlogCreate",
  additionalProperties: false,
  properties: {
    blogId: ProductBlog.properties.blogId,
    productId: ProductBlog.properties.productId,
    sectionImage: ProductBlog.properties.sectionImage,
    // status: ProductBlog.properties.status,
  },
  required: ["categoryId", "categoryName", "taxPercentage"],
};
export const WishlistCreate = {
  type: "object",
  $id: "WishlistCreate",
  additionalProperties: false,
  properties: {
    WishlistId: Wishlist.properties.WishlistId,
    customerId: Wishlist.properties.customerId,
    productId: Wishlist.properties.productId,
  },
  required: ["WishlistId", "customerId", "productId"],
};
export const CartCreate = {
  type: "object",
  $id: "CartCreate",
  additionalProperties: false,
  properties: {
    cartId: Cart.properties.cartId,
    customerId: Cart.properties.customerId,
    productId: Cart.properties.productId,
    variantId: Cart.properties.variantId,
    units: Cart.properties.units,
    singleProductPrice: Cart.properties.singleProductPrice,
    totalPrice: Cart.properties.totalPrice,
    // status: Cart.properties.status,
  },
  required: [
    "cartId",
    "customerId",
    "productId",
    "variantId",
    "units",
    "singleProductPrice",
    "totalPrice",
  ],
};

export const OrderCreate = {
  type: "object",
  $id: "OrderCreate",
  additionalProperties: false,
  properties: {
    id: Order.properties.id,
    orderId: Order.properties.orderId,
    customerId: Order.properties.customerId,
    shippingAddress: Order.properties.shippingAddress,
    cartId: Order.properties.cartId,
    totalAmount: Order.properties.totalAmount,
    paidAmount: Order.properties.paidAmount,
    reason: Order.properties.reason,
    paymentStatus: Order.properties.paymentStatus,
    orderStatus: Order.properties.orderStatus,
  },
  required: [
    "OrderId",
    "orderId",
    "customerId",
    "shippingAddress",
    "cartId",
    "razorpayOrderId",
    "razorpayPaymentId",
    "totalAmount",
    "paidAmount",
    "reason",
    "paymentStatus",
    "orderStatus",
  ],
};
export const ReviewsCreate = {
  type: "object",
  $id: "ReviewsCreate",
  additionalProperties: false,
  properties: {
    reviewId: Reviews.properties.reviewId,
    customerId: Reviews.properties.customerId,
    productId: Reviews.properties.productId,
    rating: Reviews.properties.rating,
    review: Reviews.properties.review,
    // arrayOfImages: Reviews.properties.arrayOfImages,
    // status: Reviews.properties.status,
  },
  required: ["reviewId", "customerId", "productId", "rating", "review"],
};
