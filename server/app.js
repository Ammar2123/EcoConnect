const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const conn = require('./connection/conn');
const clerkMiddleware = require('@clerk/express').clerkMiddleware
const cors = require("cors")

const PORT = process.env.PORT || 4000;
dotenv.config()

conn();

app.use(bodyParser.json());
app.use(clerkMiddleware());
app.use(cors())


// routes
app.use("/api/v1", require("./routes/contributeRoutes"));
app.use("/users", require('./routes/userRoutes'));

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});