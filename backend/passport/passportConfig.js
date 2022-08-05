const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");

//verify function

async function verify(user_name, password, done) {
  //check if the user exist
  const user = await db.one(
    "SELECT * FROM users WHERE user_name=$1",
    user_name
  );
  //check for error
  if (!user.id) return done(null, false);
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
  { usernameField: user_mane, passwordField: password },
  verify
);
//pass the strategy to passport
passport.use(strategy);

//attach user id to the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
//attach the correct user to the req obj
passport.deserializeUser(function (userId, done) {
  User.findById(userId, function (err, user) {
    done(err, user);
  });
});