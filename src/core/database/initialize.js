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
  //Distributor
  models.expense.belongsTo(models.distributor, {
    sourceKey: "id",
    foreignKey: "distributorId",
  });
  models.order.belongsTo(models.store, {
    sourceKey: "id",
    foreignKey: "storeId",
  });
  models.order.belongsTo(models.production, {
    sourceKey: "id",
    foreignKey: "productionId",
  });
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

  // await connection.sync({ force: false });
  await connection.sync({ force: false }).catch((c) => {
    console.log(c);
  });

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
