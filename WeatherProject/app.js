const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = "173a9828783d17f98da7e23ec5ba4343";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

    https.get(url, (response) => {
        // console.log(response.headers);
        console.log(response.statusCode);

        response.on("data", (data) => {
            var weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconImage = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`;
            // console.log(temp);
            // console.log(description);
            res.write("<p> The weather is currently " + description + " </p>");
            res.write(
                `<h1>The temperature in ${query} is ${temp} Degree </h1>`
            );
            res.write(iconImage);
            res.send();
        });
    });
});

app.listen(5000, () => {
    console.log("The server is running on port 5000");
});

// response.on("data", (d) => {
//     console.log(d); // Hexadecimal format, so we need to get in human readable way
// });

// var object = {
//     name: "Aashik",
//     age: 25,
//     favourite: "Burger",
// };

// console.log(JSON.stringify(object)); // to consist min amount of space
