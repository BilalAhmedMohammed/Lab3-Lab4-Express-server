const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://localhost:27017/ITI_MEARN');
autoIncrement.initialize(connection);
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    _id:{
        type:Number
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 8
    },
    password: {
        type: String,
        required: true
    }
    ,
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15,
    },
    dob: {
        type: Date,
        default: '2002-12-09'
    },
}, { timestamps: true });
userSchema.pre('save', function () {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}
// const UserModel = mongoose.model("User", userSchema); // to create or select .....

userSchema.plugin(autoIncrement.plugin, 'User');
var UserModel = connection.model('User', userSchema);

module.exports = UserModel;