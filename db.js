const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//connect to DB using mongoose
mongoose.connect("{mongodb credentail here}", (error, data) => {
  if (error) {
    return console.log(error);
  }
  console.log("Connected to db.");
});
