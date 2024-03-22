const express = require("express");
const bodyParser = require("body-parser");
const date = require("./date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

let day = "";

app.get("/", (req, res) => {
    const day = date.getDate();

    res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", (req, res) => {
    // console.log(req.body);
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
    // res.render("list", {});
});

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => {
    console.log(`Your server is running on port 3000`);
});

// const days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
// ];

// day = days[today.getDay()];
