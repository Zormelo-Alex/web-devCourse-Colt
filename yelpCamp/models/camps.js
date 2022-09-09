const mongoose = require("mongoose");
//laying out the schema
const campgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    price: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

//making a model...(table name)
module.exports = mongoose.model("Campground", campgroundSchema);