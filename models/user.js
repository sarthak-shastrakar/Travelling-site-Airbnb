// paasport is express compatible authentication middleware for node.js -->
// we use it to authenticate users before they can access our routes
// 1.npm i passport
// 2. npm i passport-local
// 3. npm i passport-local-mongoose

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
