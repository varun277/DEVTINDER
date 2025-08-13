const express = require('express');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateSignUpData } = require('../utils/Validation');
const authRouter = express.Router();

//login
authRouter.post("/login", async (req, resp) => {
    const { emailId, password } = req.body;

    const user = await userModel.findOne({ emailId: emailId });
    if (!user) {
        throw new Error("Invalid Credential")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    const { _id } = user;

    if (isPasswordValid) {
        // Steps for JWT creattion and authentication
        // 1. Create a JWT token
        // 2. Add the token to cookie and send the response back to the user
        const token = jwt.sign({ id: _id }, 'DEVTINDER@$799!', { expiresIn: '1d' });

        resp.cookie("token", token)
        resp.send("Login Successfull !!!")
    }
    else {
        throw new Error("Password is incorrect")
    }
})

// Sign up
authRouter.post("/signup", async (req, resp, next) => {
    // Steps
    // 1. Validation of data
    // 2. Encrypt the password
    // For that we are creating seperate function to validate signup data
    // 3. store encrypted password inside db

    try {
        validateSignUpData(req)
        const { firstName, lastName, password, emailId } = req.body;
        const passwordHash = await bcrypt.hash(password, salt = 10);

        const user = new userModel({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });
        // Creating a new instance for user model
        await user.save();
        resp.json({ "message": "User added successfully", "status": 200 })
    }
    catch (err) {
        console.log('error: ', err);
        resp.status(400).send("Error: " + err.message)
    }
})

authRouter.post("/logout", async (_, resp, next) => {
    try {
        // resp.cookie("token", null, {
        //     expiresIn: new Date(Date.now()),
        // })
        // Clear cookie immediately
        resp.clearCookie("token");

        resp.status(200).json({
            "message": "Logout Successfull !!!",
            "status": true
        })
    }
    catch (err) {
        resp.status(400).send("Error: " + err.message)
    }
})

module.exports = authRouter;
