function keepLogin(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    // errror code is very important
    return res.status(404).json({ success: false, isLogin: false });
  }
}

module.exports = {
  keepLogin,
};
