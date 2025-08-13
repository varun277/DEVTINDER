const express = require('express');
const { userAuth } = require('../Middleware/auth');
const { validateProfileData } = require('../utils/Validation');
const profileRouter = express.Router();

// Get user details
profileRouter.get('/profile/view', userAuth, async (req, resp) => {
    try {
        resp.send(`Welcome coder ${req?.user?.firstName}`)
    }
    catch (err) {
        resp.status(400).send("Error: " + err)
    }
})

profileRouter.post('/profile/edit', userAuth, async (req, resp) => {
    try {
        if (!validateProfileData(req)) {
            throw new Error("Invalid edit request");
        }
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((field) => (
            loggedInUser[field] = req.body[field]
        ))
        await loggedInUser.save();

        resp.json({
            "status": 200,
            "message": "Profile updated successfully"
        })
    }
    catch (err) {
        resp.status(400).send(err)
    }
})

module.exports = profileRouter;