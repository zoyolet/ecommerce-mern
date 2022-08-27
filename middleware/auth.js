function auth(req, resp, next) {
  console.log("running middleware", req.body);
  next();
}

module.exports = auth;
