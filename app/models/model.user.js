const mongoose = require('mongoose');
const hasher = require('../helpers/hasher');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

userSchema.pre('save', async function(next) {
    this.password = await hasher.hash(this.password, hasher.saltRounds);
    next();
});

// virtual function fullname join lastname and firstname with first letter capital
userSchema.virtual('fullname').get(function() {
    return 'Fullname';
    // return `${this.firstname.charAt(0).toUpperCase()}${this.firstname.slice(1)} ${this.lastname.charAt(0).toUpperCase()}${this.lastname.slice(1)}`;
})


module.exports = mongoose.model('User', userSchema);