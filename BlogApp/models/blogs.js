const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    post: String,
    created: { type: Date, default: Date.now },
    user: {
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        email: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }]
});
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;