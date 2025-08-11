const express = require('express');
const { userAuth } = require('../Middleware/auth');
const profileRouter = express.Router();

// Get user details
profileRouter.get('/profile', userAuth, async (req, resp) => {
    try {
        resp.send(`Welcome coder ${req?.user?.firstName}`)
    }
    catch (err) {
        resp.status(400).send("Error: " + err)
    }
})

module.exports = profileRouter;