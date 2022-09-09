const mongoose = require("mongoose");
const passportLocalmongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
}
);
userSchema.plugin(passportLocalmongoose);
const User = mongoose.model("User", userSchema);

module.exports = User;