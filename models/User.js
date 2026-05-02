const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: 3
    },
    role: {
        type: String,
        required: [true, "Role is required"]
    }
});

module.exports = mongoose.model('User', userSchema);