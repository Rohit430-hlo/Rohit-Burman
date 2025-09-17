const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  // recommended
    },
    password: {
        type: String,
        required: true
    },
    files: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File'
        }
    ]
});

module.exports = mongoose.model('User', userModel);
