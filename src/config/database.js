const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const connectDb = async () => {
    await mongoose.connect("mongodb+srv://varunmohan277:w7MgZTaCBsdqWcxw@learnmongo.xqb0e4o.mongodb.net/devTinder")
}

module.exports = connectDb 