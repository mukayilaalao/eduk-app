const express = require("express");
const db = require("../db/dbConfig.js");
const auth = express.Router();
const { createUser } = require("../queries/users.js");
const { authUser } = require("../queries/auth.js");
const bcrypt = require("bcrypt");

//helper function
const {
  uppercaseAllLetters,
  capitalizedFirstLetter,
} = require("../validation/helper.js");

//create a auth
auth.post("/sign_up", async (req, res) => {
  const { password } = req.body;
  const hashedpassword = await bcrypt.hash(password, 10);
  const user = req.body;
  user.first_name = capitalizedFirstLetter(user.first_name);
  user.last_name = uppercaseAllLetters(user.last_name);

  user.password = hashedpassword;
  //grant admin role to a user
  user.is_admin = user.user_name.toLowerCase() === "administrator";
  const createdUser = await createUser(user);
  if (createdUser.uid) {
    res.json({ success: true, result: createdUser });
  } else
    res
      .status(500)
      .json({ success: false, error: "Error/Username already exist" });
});

//Login a exsiting user
auth.post("/login", async (req, res) => {
  const { user_name, password } = req.body;
  const userInfo = await authUser(user_name, password);

  try {
    if (!isNaN(userInfo.uid)) res.json({ success: true, result: userInfo });
    else res.status(500).json({ success: false, error: userInfo.error });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, error: "Incorrect Username or Password" });
  }
});

module.exports = auth;
