const mongoose = require("mongoose");

const commentsShema = mongoose.Schema({
    content: String,
    user: {
            id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

const Comments = mongoose.model("Comments", commentsShema);

module.exports = Comments;