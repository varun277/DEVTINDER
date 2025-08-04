const express = require('express');
const app = express();
const connectDb = require('./config/database');
const userModel = require('./models/user');
const { validateSignUpData } = require('../src/utils/Validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const { userAuth } = require('../src/Middleware/auth')

app.use(express.json())
app.use(cookieParser())

app.post("/login", async (req, resp) => {
    const { emaildId, password } = req.body;

    const user = await userModel.findOne({ emaildId: emaildId });
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

// Get user details
app.get('/profile', userAuth, async (req, resp) => {
    try {
        resp.send(`Welcome coder ${req?.user?.firstName}`)
    }
    catch (err) {
        resp.status(400).send("Error: " + err)
    }
})

// Call this api only if somebody login the app
app.post("/sendConnectionRequest", userAuth, async (req, resp, next) => {
    try {
        resp.send("This api is only called when user login successfull")
    }
    catch (err) {
        resp.status(400).send("Error: " + err)
    }
})

// Sign up
app.post("/signup", async (req, resp, next) => {
    // Steps
    // 1. Validation of data
    // 2. Encrypt the password
    // For that we are creating seperate function to validate signup data
    // 3. store encrypted password inside db

    try {
        validateSignUpData(req)
        const { firstName, lastName, password, emaildId } = req.body;
        const passwordHash = await bcrypt.hash(password, salt = 10);

        const user = new userModel({
            firstName,
            lastName,
            emaildId,
            password: passwordHash
        });
        // Creating a new instance for user model
        await user.save();
        resp.send("User added successfully")
    }
    catch (err) {
        console.log('eer', err);
        resp.status(400).send("Error: " + err.message)
    }
})

app.get("/user", async (req, resp, next) => {
    try {
        const user = await userModel.find({ firstName: req.body.firstName });
        if (user.length === 0) {
            resp.send({ error: "User not found" })
        }
        console.log({ user });
        resp.send(user)
    }
    catch (err) {
        console.log("Failed to fetch : ", err);
    }
})

app.delete("/user", async (req, resp, next) => {
    const userId = req.body.userId;
    try {
        const userDetail = await userModel.findByIdAndDelete(userId);
        console.log({ userDetail });

        resp.send({ message: `User ${userId} is deleted` })
    }
    catch (err) {
        console.log("Failed to fetch : ", err);
    }
})

app.patch('/user', async (req, resp, next) => {
    const emaildId = req.body?.emaildId;
    const data = req?.body;
    try {
        const ALLOWED_UPDATES = [
            "emaildId",
            "photoUrl",
            "about",
            "skills",
            "age"
        ]
        const isUpdateAllowed = Object.keys(data)?.every((item) => ALLOWED_UPDATES?.includes(item));
        if (!isUpdateAllowed) {
            resp.status(400).send("Update not allowed")
        }

        const userDetail = await userModel.updateOne({ emaildId: emaildId }, data);
        resp.send({ message: `User ${emaildId} is updated with new value` })
    }
    catch (err) {
        console.log("Failed to update : ", err);
    }
})

// Connect the db
connectDb().then((resp) => {
    console.log("Database connection established");
    // Create a server
    app.listen(3000, () => {
        console.log('server is successfully listening');
    })
}).catch((err) => {
    console.log("Failed to connect : ", err);
})