const jwt = require("jsonwebtoken");

function auth(req, resp, next) {
  if (!req.session.isLoggedIn) {
    return resp.redirect("/users/login");
  }
  next();
}

module.exports = auth;
