function keepLogin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.json({ success: false, isLogin: false });
}

module.exports = {
  keepLogin,
};
