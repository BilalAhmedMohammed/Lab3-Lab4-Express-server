const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://localhost:27017/ITI_MEARN');
autoIncrement.initialize(connection);
const todoSchema = mongoose.Schema({
    userID: {
        type: Number,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20
    },
    status: {
        type: String,
        default: "to-do",
        enum: ["to-do", "in progress", "done"]
    },
    tags: {
        type: [{type:String,maxLength:10,}],
    }
}, { timestamps: true });
todoSchema.plugin(autoIncrement.plugin, 'Todo');
const TodoModel = mongoose.model("Todo", todoSchema); // to create or select .....
module.exports = TodoModel;
