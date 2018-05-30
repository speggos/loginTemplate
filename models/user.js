import mongoose from 'mongoose';

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

let User = module.exports = mongoose.model('User', userSchema);


module.exports.getUsers = (user, callback) => {
    User.find(callback)
};

module.exports.addUser = (user, callback) => {
    console.log('user', user)
    User.create(user, callback)
};