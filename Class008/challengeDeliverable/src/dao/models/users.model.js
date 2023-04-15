const { Schema, model } = require('mongoose');
const collection = 'users'
const UserSchema = new Schema({
    first_name : { type: String, required: true },
    last_name : { type: String, required: true },
    email : { type: String, required: true }
});
const userModel = model(collection, UserSchema);

module.exports = {
    userModel
}