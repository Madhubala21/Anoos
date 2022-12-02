import * as models from "./models/index.js";
import { connection } from "./connection.js";
import { devDbController } from "./Controller/devDbController.js";
import { rootuser } from "./connection.js";
import { adminDbController } from "./Controller/adminDbController.js";
import ora from "ora";
import chalk from "chalk";

//Check connection
export const dbConnection = async () => {
  return await connection.authenticate();
};

//Define DB Model Associations

export const modelAssociations = async () => {
  // Product
  // models.product.hasMany(models.productVariants, {
  //   sourceKey: "id",
  //   foreignKey: "productId",
  // });
  // models.product.hasMany(models.reviews, {
  //   sourceKey: "id",
  //   foreignKey: "productId",
  // });
  // models.productVariants.hasMany(models.reviews, {
  //   sourceKey: "id",
  //   foreignKey: "variantId",
  // });
  // models.customer.hasMany(models.reviews, {
  //   sourceKey: "id",
  //   foreignKey: "customerId",
  // });
  // //cart
  // models.cart.belongsTo(models.productVariants, {
  //   sourceKey: "id",
  //   foreignKey: "variantId",
  // });
  // //customer
  // models.shippingAddress.belongsTo(models.customer, {
  //   sourceKey: "id",
  //   foreignKey: "customerId",
  // });
  // //order
  // models.customer.hasMany(models.orders, {
  //   sourceKey: "id",
  //   foreignKey: "customerId",
  // });
};

var msg = chalk.yellow("Creating Tables");
const spinner = ora(msg).start();
spinner.color = "yellow";

export const dbSync = async () => {
  //table associations
  await modelAssociations();

  //sync all Db Models
  await Promise.all(Object.values(models));

  //Create Db Models

  await connection.sync({ force: false });

  //Insert Default Db values
  // await devDbController.defaultUsers.configuration(rootuser.configuration);

  var msg = chalk.yellow("Tables Created");
  spinner.succeed(msg);
};

//App configs
export const Configurations = async () => {
  const appConfigs = await adminDbController.Appconfigs();
  global.configs = {
    baseUrl: appConfigs?.baseUrl,
    hostEmail: appConfigs?.hostEmail,
    placeholder: appConfigs?.placeholder,
    shippingFee: appConfigs?.shippingFee,
    messagingKey: appConfigs?.messagingKey,
    paymentGatewayId: appConfigs?.paymentGatewayId,
    paymentGatewaySecret: appConfigs?.paymentGatewaySecret,
    paymentCallback: appConfigs?.paymentCallback,
    passwordSecret: appConfigs?.passwordSecret,
    jwtClientSecret: appConfigs?.jwtClientSecret,
    jwtAdminSecret: appConfigs?.jwtAdminSecret,
    jwtEmailSecret: appConfigs?.jwtEmailSecret,
    status: appConfigs?.status,
  };
};
