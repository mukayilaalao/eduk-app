const passport = require("passport");
const strategy = require("passport-local");
const db = require("../db/dbConfig.js");

//verify function
function verify(username, password, done) {
  //check if the user exist
  //check if the password match
}

//create a new strategy and pass verify function

//serialize the user(add user id to the session object)

//deserialize the user(add user object to the request object)
