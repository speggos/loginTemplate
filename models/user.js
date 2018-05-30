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


module.exports.getUsers = (callback) => {
    User.find(callback)
};

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

module.exports.getUserByEmailOrUsername = (identifier, callback) => {

}

module.exports.addUser = (user, callback) => {
    User.create(user, callback);

    User.find(user);
};

module.exports.deleteUser = (id, callback) => {
    User.findById(id).remove(callback)
};

module.exports.updateUser = (id, updatedFields, callback) => {

    const query = {_id: id};

    User.findOneAndUpdate(query, updatedFields, callback)
};