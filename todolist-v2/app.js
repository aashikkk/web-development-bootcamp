const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const _ = require("lodash");

const { Schema, model } = mongoose;

let day = "";

main().catch((err) => {
    console.log(err);
});

async function main() {
    // await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
    await mongoose.connect(
        "mongodb+srv://admin-aashik:test123456@cluster0.rghqb6x.mongodb.net/todolistDB"
    );

    mongoose.connection.on("error", (error) => {
        console.error("MongoDB connection error:", error);
    });
}

const itemsSchema = new Schema({
    name: String,
});

const Item = model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist",
});

const item2 = new Item({
    name: "Hit the + button to add a new item",
});

const item3 = new Item({
    name: "<-- Hit this to delete an item",
});

const defaultItems = [item1, item2, item3];

const listSchema = Schema({
    name: String,
    items: [itemsSchema],
});

const List = model("List", listSchema);

app.get("/", async (req, res) => {
    try {
        const query = Item.find();
        query.select("name");

        // Executing the query and handling the results using async/await
        const foundItems = await query.exec();

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems);
            res.redirect("/");
        } else {
            res.render("list", {
                listTitle: "Today",
                newListItems: foundItems,
            });
        }

        // Rendering the view with the fetched items
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/:customListName", async (req, res) => {
    const customListName = _.capitalize(req.params.customListName);

    const foundList = await List.findOne({ name: customListName });

    if (!foundList) {
        const list = new List({
            name: customListName,
            items: defaultItems,
        });

        list.save();
        res.redirect(`/${customListName}`);
    } else {
        res.render("list", {
            listTitle: foundList.name,
            newListItems: foundList.items,
        });
    }
});

app.post("/", async (req, res) => {
    // console.log(req.body);
    let itemName = req.body.newItem;
    let listName = req.body.list;

    const item = new Item({
        name: itemName,
    });

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        const foundList2 = await List.findOne({ name: listName });
        foundList2.items.push(item);
        foundList2.save();
        res.redirect("/" + listName);
    }
});

app.post("/delete", async (req, res) => {
    const checkItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndDelete(checkItemId).exec();
        res.redirect("/");
    } else {
        List.findOneAndUpdate(
            { name: listName },
            { $pull: { items: { _id: checkItemId } } }
        ).exec(); // list.items.id
        res.redirect("/" + listName);
    }
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => {
    console.log(`Your server is running on port 3000`);
});
