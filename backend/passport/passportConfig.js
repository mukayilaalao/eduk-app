const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");

//verify function

async function verify(user_name, password, done) {
  //   console.log("run verify");
  //check if the user exist
  const user = await db.one(
    "SELECT * FROM users WHERE user_name=$1",
    user_name
  );
  //check for error
  if (!user.uid) return done(null, false);
  // after getting the correct user
  //check if the password match
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    return done(null, user);
  }
  return done(null, false);
}

//create a new strategy and pass verify function
//pass this object if you wish to change the default username and password field  => {usernameField:user_mane, passwordField:password}
const strategy = new LocalStrategy(
  { usernameField: "user_name", passwordField: "password" },
  verify
);
//pass the strategy to passport
passport.use(strategy);

//attach user id to the session
passport.serializeUser(function (user, done) {
  //   console.log("run serializer");
  done(null, user.uid);
});
//attach the correct user to the req obj
passport.deserializeUser(async function (userId, done) {
  //   console.log("run deserializer");
  const user = await db.one("SELECT * FROM users WHERE uid=$1", userId);
  if (user.uid) done(null, user);
  else done(user, null);
});
