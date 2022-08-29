const jwt = require("jsonwebtoken");

function auth(req, resp, next) {
  if (req) {
    console.log(req);
  }
  console.log("running middleware", req.body);
  if (!req.session.isLoggedIn) {
    return res.redirect("/user/login");
  }
  next();
}

module.exports = auth;
