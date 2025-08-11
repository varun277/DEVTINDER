const express = require('express');
const app = express();
const connectDb = require('./config/database');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

// Miiddleware to parse JSON bodies
app.use(express.json())
// Cookie parser: Its makes the cookie available in req.cookies
app.use(cookieParser())

// Routers
app.use('/', authRouter, profileRouter, requestRouter);

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