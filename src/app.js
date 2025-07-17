const express = require('express');
const app = express()

// To handle the code
app.use("/", (req, res) => {
    res.send("Hello from the server1")
})

app.use("/about", (req, res) => {
    res.send("Hello from the about")
})

app.use("/home", (req, res) => {
    res.send("Hello from the home")
})

// Create a server
app.listen(3000, () => {
    console.log('server is successfully listening');
})