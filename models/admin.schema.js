const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  confirmPass: String
});

const adminModel = mongoose.model("adminTbl", adminSchema);

module.exports = adminModel;