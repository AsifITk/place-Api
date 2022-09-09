const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://admin:admin@cluster0.twzwu14.mongodb.net/?retryWrites=true&w=majority`;
require("dotenv").config(); //dotenv config
let placeRoutes = require('./routes/placeRoute')

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB...", err));
app.use(express.json());

app.use("/place", placeRoutes)
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Server is ok");
});

app.listen(8000, () => {
    console.log("Port is Ok");
});
