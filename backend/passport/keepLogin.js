function keepLogin(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  return res.json({ success: false, isLogin: false });
}

module.exports = {
  keepLogin,
};
