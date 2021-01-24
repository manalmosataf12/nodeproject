const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
},
tags: [String],
body: String,

auther: String,
img: {
    data: Buffer,
    contentType: String
},
userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
}
  
});

const todoModel = mongoose.model('Blog', todoSchema);

module.exports = todoModel;
