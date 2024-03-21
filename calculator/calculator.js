const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    // console.log(req.body);
    var num1 = parseInt(req.body.num1);
    var num2 = parseInt(req.body.num2);

    var result = num1 + num2;
    res.send("The result of calculation is " + result);
});

app.get("/bmicalculator", (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", (req, res) => {
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);

    var bmi = weight / height ** 2;
    res.send("Your BMI is " + bmi.toFixed(2));
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
