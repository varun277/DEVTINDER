const express = require('express');
const { userAuth } = require('../Middleware/auth');
const requestRouter = express.Router();

// Call this api only if somebody login the app
requestRouter.post("/sendConnectionRequest", userAuth, async (req, resp, next) => {
    try {
        resp.send("This api is only called when user login successfull")
    }
    catch (err) {
        resp.status(400).send("Error: " + err)
    }
})

module.exports = requestRouter