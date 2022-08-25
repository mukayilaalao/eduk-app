// DEPENDENCIES
const cors = require("cors");
const express = require("express");
//session middleware
const session = require("express-session");
//session storage
const pgSession = require("connect-pg-simple")(session);
//db connection
const db = require("./db/dbConfig.js");

const passport = require("passport");

//controllers
const usersController = require("./controllers/usersControllers.js");
const resourcesController = require("./controllers/resourcesControllers.js");
const mentorsController = require("./controllers/mentorsControllers.js");
const authController = require("./controllers/authController.js");
const owners = require("./controllers/owners");

// CONFIGURATION
const app = express();
require("dotenv").config();

// Parse incoming JSON
app.use(express.json());

// MIDDLEWARE
app.use(
  cors({
    origin: `${process.env.BACKEND_CORS}`,
    credentials: true,
  })
);

//session config
//add the session storage
app.use(
  session({
    secret: `${process.env.SECRET_SESSION}`,
    resave: false,
    saveUninitialized: true,
    // session store
    store: new pgSession({
      pgPromise: db, // Connection pg-promise
      // tableName : 'user_sessions'   // if need to use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),

    cookie: {
      maxAge: 1000 * 24 * 60 * 60,
      domain: process.env.DOMAIN,
    },
  })
);

//passport init and session config
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", `${process.env.BACKEND_CORS}`);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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

app.get("/", (req, res) => {
  res.send("Welcome To EDUK App");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
