const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const userAuth = async (req, resp, next) => {
    try {
        const { token } = req.cookies;
        const { id } = jwt.verify(token, 'DEVTINDER@$799!');
        const user = await userModel.findById(id);
        if (!user) {
            throw new Error("This user does not exist")
        }
        // Just passing user to req object so that user data is available in next middleware function
        req.user = user
        next();
    }
    catch (err) {
        resp.status(400).send("Error : " + err)
    }
}

module.exports = {
    userAuth
}