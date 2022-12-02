import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class admin extends Model {}

admin.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "terminated"),
      allowNull: false,
      defaultValue: "inactive",
    },
    type: {
      type: DataTypes.ENUM("ROOT", "USER"),
      allowNull: false,
      unique: true,
      defaultValue: "ROOT",
    },
  },
  { sequelize: connection, freezeTableName: true }
);

class adminAuthentication extends Model {}

adminAuthentication.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    uid: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ipv4: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    latLong: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "terminate"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  { sequelize: connection, freezeTableName: true }
);

class banner extends Model {}

banner.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bannerImage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // bannerText: {
    //   type: DataTypes.STRING(255),
    //   allowNull: false,
    // },
    bannerType: {
      type: DataTypes.ENUM("offer", "normal", "festival"),
      allowNull: false,
      defaultValue: "normal",
    },
    // bannerFor: {
    //   type: DataTypes.ENUM("category", "product"),
    //   allowNull: false,
    //   defaultValue: "category",
    // },
    // productOrCategoryId: {
    //   type: DataTypes.BIGINT.UNSIGNED,
    //   allowNull: true,
    //   defaultValue: 0
    // },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  { sequelize: connection, freezeTableName: true }
);

class config extends Model {}

config.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    baseUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hostEmail: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    placeholder: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue:
        "https://ik.imagekit.io/lokki/Avatar/placeholder_XFzrDmSml.png?updatedAt=1638958916450",
    },
    shippingFee: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    messagingId: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    messagingKey: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paymentEnvironment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paymentGatewayId: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paymentGatewaySecret: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paymentCallback: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    passwordSecret: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    jwtClientSecret: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    jwtAdminSecret: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    jwtEmailSecret: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "terminated"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  { sequelize: connection, freezeTableName: true }
);

export { admin, banner, config, adminAuthentication };
