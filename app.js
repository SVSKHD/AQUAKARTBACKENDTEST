const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//for swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//custom error middleware for easy front end
const productionError = require("./middlewares/productionError");

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookies and file middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

//temp check
app.set("view engine", "ejs");

//morgan middleware
app.use(morgan("tiny"));

// Welcome message route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the AquaKart Backend API" });
});

//import all routes here
const home = require("./routes/home");
const user = require("./routes/user");
const product = require("./routes/product");
const payment = require("./routes/payment");
const order = require("./routes/order");

//router middleware
app.use("/v1/api", home);
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", payment);
app.use("/api/v1", order);

const adminUser = require("./routes/crm/admin");
// crm routes
app.use("/api/crm", adminUser);

app.get("/api/signuptest", (req, res) => {
  res.render("signuptest");
});

app.get("/home", (req, res) => {
  res.render("home");
});

//to handle production error
app.use(productionError);

// export app js
module.exports = app;
