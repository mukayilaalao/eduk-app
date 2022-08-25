//NOT IN USE -> USING PASSPORT JS FOR USER AUTH

const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");

const authUser = async (user_name, password) => {
  try {
    const user = await db.one(
      "SELECT * FROM users WHERE user_name=$1",
      user_name
    );

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const userInfo = {
        uid: user.uid,
        user_name: user.user_name,
        is_admin: user.is_admin,
        mentor_id: user.mentor_id,
      };
      return userInfo;
    }
  } catch (e) {
    return { error: "Username doesn't exist..." };
  }
};

module.exports = {
  authUser,
};
