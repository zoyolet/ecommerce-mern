var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var sessions = require("express-session");
var logger = require("morgan");
var auth = require("./middleware/auth");

var indexRouter = require("./controller/IndexController");
var usersRouter = require("./controller/UserController");
var adminRouter = require("./controller/AdminController");
var cartRouter = require("./controller/CartController");
var orderRouter = require("./controller/OrderController");
var productRouter = require("./controller/ProductController");
var secret = "veryverysecretkey";
var app = express();
require("./db");

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: secret,
    isLoggedIn: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", auth, adminRouter);
app.use("/cart", auth, cartRouter);
app.use("/product", productRouter);
app.use("/order", auth, orderRouter);
app.get("*", function (req, res) {
  res.render("404page");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
