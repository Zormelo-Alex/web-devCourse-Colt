const mongoose =  require("mongoose");
const pasportLocalmongoose =  require("passport-local-mongoose");

const userSchema = mongoose.Schema({
    name: String,
    password: String
});

userSchema.plugin(pasportLocalmongoose);
const User = mongoose.model("User", userSchema);

module.exports = User;