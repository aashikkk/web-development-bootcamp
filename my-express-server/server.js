const express = require("express");
const app = express();

app.get("/", function (req, res) {
    res.send("<h1>Hello Guys</h1>");
});

app.get("/contact", function (req, res) {
    res.send("contact me through sihaabama@gmail.com");
});

app.get("/about", (req, res) => {
    // ES6 Anonymous function
    res.send("I'm aashik Shihaab \n Software Developer");
});

app.listen(5000, function () {
    console.log("Server started on port 5000");
});
