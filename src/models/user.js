const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emaildId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address : " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate: (value) => {
            if (!validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, })) {
                throw new Error("Password is not strong. Please create an another one")
            }
        }
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    photoUrl: {
        type: String,
        default: "https://www.w3schools.com/w3images/avatar6.png",
        validate: (value) => {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Email Address : " + value)
            }
        }
    },
    about: {
        type: String
    },
    skills: {
        type: [String],
        default: [],
        validate: (value) => {
            if (value?.length > 10) {
                throw new Error("Skills should not be more than 10")
            }
        }
    },

}, {
    timestamps: true
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel