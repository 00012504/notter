const mongoose  = require('mongoose')
const { Schema } = mongoose;

const noteSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
}, {
    timestamps: true
});

module.exports = mongoose.model("Note", noteSchema)