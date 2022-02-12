const User = require('../models/users');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const usersNames = () => User.find({}, { 'firstName': 1, '_id': 0 });

const create = (user) => User.create(user);

const login = async ({ username, password }) => {
    const user = await User.findOne({ username }).exec();
    const userWithOutPass = await User.findOne({ username }, { 'firstName': 1, 'lastName': 1, 'dob': 1, 'createdAt': 1, 'updatedAt': 1 }).exec();
    const valid = await user.comparePassword(password);
    if (!valid) throw "UN_AUTH";
    return {
        "jwt": jwt.sign({
            username, userId: user.id
        }, process.env.SECRET_KEY, { expiresIn: '1h' }), "user": userWithOutPass
    };
}
const deleteUser = (id) => {
    return User.deleteOne({ _id: id });
}
const updateUser = async (id, reqBody) => {
    const user = User.findById(id);
    const { username, password, firstName, lastName, dob } = reqBody;
    return await User.findOneAndUpdate({ _id: id }, { username: username ? username : user.username, password: password ? password : user.password, firstName: firstName ? firstName : user.firstName, lastName: lastName ? lastName : user.lastName, dob: dob ? dob : user.dob }, {
        new: true
    });
}

module.exports = {
    create,
    login,
    usersNames,
    deleteUser,
    updateUser
};