import express from "express";
import cors from "cors";
import chalk from "chalk";
import path from "path";
const __dirname = path.resolve();
import helmet from "helmet";
import * as config from "./config/config.js";
import { setup } from "./src/core/setup.js";
import { Logger } from "./src/core/lib/logger.js";
import dotenv from "dotenv";
dotenv.config();
//require routers

import { getStarted } from "./src/Distributor/controller/authController.js";
import { adminRouter } from "./src/Admin/routes/index.Routes.js";
import { distributorRouter } from "./src/Distributor/routes/index.js";
import { productionRouter } from "./src/Production/routes/index.js";

const app = express();

//Enable cross origin policy
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    methods: "GET,POST,PUT",
    preflightContinue: false,
    credentials: true,
  })
);

app.set("view engine", "ejs");
app.set("views", "./src/core/views/ui/");
app.use(express.static("pages"));
app.use("/images", express.static(path.join(__dirname, "./src/core/images")));

//Parsing incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//security
app.use(helmet());

//routers
app.use("/admin", adminRouter);
app.use("/distributor", distributorRouter);
app.use("/production", productionRouter);

//mailer
app.get("/getStarted", getStarted);

//checkStatus
app.use("/status", async (req, res) => {
  res.json({ data: `${process.env.APP_NAME} API is Now Live` });
});

//404 handlers
app.get("/", async (req, res) => {
  res.status(404).render("404", {
    message: "Unable to find the requested resource",
    name: process.env.APP_NAME,
  });
});
app.use(function (req, res, next) {
  res.status(404).render("404", {
    message: "Unable to find the requested resource",
    name: process.env.APP_NAME,
  });
});
// console.log("process.env.port", process.env.DEV_PORT);
const AppConfig =
  config.mode === "production" ? config.production : config.development;
setup(AppConfig)
  .then((config) => {
    app.listen(config.server.port);
    Logger.info(
      chalk.green(`${config.database.appName}  API Listening ✔️ ✔️ ✔️ `)
    );
  })
  .catch((error) => {
    Logger.error(JSON.stringify(error));
    process.abort();
  });
