const express = require("express");
const db = require("../db/dbConfig.js");
const auth = express.Router();
const { createUser } = require("../queries/users.js");
const passport = require("passport");
// const { authUser } = require("../queries/auth.js");
const bcrypt = require("bcrypt");
//generate hash fuuction
const { generateHash } = require("../passport/passportUtils");

//helper function
const {
  uppercaseAllLetters,
  capitalizedFirstLetter,
} = require("../validation/helper.js");

//passport config
require("../passport/passportConfig.js");

//register
auth.post("/register", async (req, res, next) => {
  const userInfo = req.body;

  userInfo.password = await generateHash(userInfo.password);

  const user = await createUser(userInfo);
  console.log(userInfo);

  // console.log(user);
  if (user.uid) {
    //we can't redirect to frontend
    return res.json({ success: true, isRegistered: true });
  }
  return res.status(501).json({
    success: false,
    error: "Error while trying to create your account.",
  });
});

// //login
auth.post(
  "/login",
  //we can't redirect to frontend link so failure and successRedirect are not useful
  passport.authenticate("local"),
  (req, res) => {
    console.log("passed the login");
    res.json({
      success: true,
      result: {
        isAdmin: false,
        isLogin: true,
        userId: req.session.passport.user,
      },
    });
  }
);

// //logout
auth.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    //we can't redirect to frontend link
    res.json({ success: true });
  });
});

module.exports = auth;

// //create a auth
// auth.post("/sign_up", async (req, res) => {
//   const { password } = req.body;
//   const hashedpassword = await bcrypt.hash(password, 10);
//   const user = req.body;
//   user.first_name = capitalizedFirstLetter(user.first_name);
//   user.last_name = uppercaseAllLetters(user.last_name);

//   user.password = hashedpassword;
//   //grant admin role to a user
//   user.is_admin = user.user_name.toLowerCase() === "administrator";
//   const createdUser = await createUser(user);
//   if (createdUser.uid) {
//     res.json({ success: true, result: createdUser });
//   } else
//     res
//       .status(500)
//       .json({ success: false, error: "Error/Username already exist" });
// });

// //Login a exsiting user
// auth.post("/login", async (req, res) => {
//   const { user_name, password } = req.body;
//   const userInfo = await authUser(user_name, password);

//   try {
//     if (!isNaN(userInfo.uid)) res.json({ success: true, result: userInfo });
//     else res.status(500).json({ success: false, error: userInfo.error });
//   } catch (e) {
//     res
//       .status(500)
//       .json({ success: false, error: "Incorrect Username or Password" });
//   }
// });
