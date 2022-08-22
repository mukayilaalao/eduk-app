//hashing function
const bcrypt = require("bcrypt");

async function generateHash(pass, saltRounds = 10) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
}

//is auth function
function isAuth(req, res, next) {
  try {
    const { uid } = req.params;
    //making sure a user can't see another user profile
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ success: false, error: "Please Login" });
    }
  } catch (error) {
    res.status(401).json({ success: false, error: "Please Login" });
  }
}

//decrypting the passwrd
function verifyPassword(pass, hash) {
  bcrypt.compare(pass, hash, function (err, result) {
    if (err) return err;
    return result;
  });
}

module.exports = {
  verifyPassword,
  generateHash,
  isAuth,
};
