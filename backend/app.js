// DEPENDENCIES
const cors = require("cors");
const express = require("express");
//session middleware
const session = require("express-session");
const passport = require("passport");
const usersController = require("./controllers/usersControllers.js");
const resourcesController = require("./controllers/resourcesControllers.js");
const mentorsController = require("./controllers/mentorsControllers.js");
const authController = require("./controllers/authController.js");
const owners = require("./controllers/owners");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());

// Parse incoming JSON
app.use(express.json());

//session config
//add the session storage
app.use(
  session({
    secret: "fired and calmed",
    resave: false,
    saveUninitialized: true,
    //store:,
    cookie: { maxAge: 1000 * 24 * 60 * 60 },
  })
);

//passport init and session config
app.use(passport.initialize());
app.use(passport.session());

// /users/1/resources
app.use("/users", usersController);

//resources controller
// /resources/1/users
app.use("/resources", resourcesController);
//mentors controller
app.use("/mentors", mentorsController);
//auth controller
app.use("/auth", authController);
// owners controllers
app.use("/owners", owners);
//multer
// console.log("underscoredirname", __dirname + "/uploads");
app.use(express.static(__dirname + "/uploads"));

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Welcome To EDUK App");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
