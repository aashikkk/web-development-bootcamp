const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { error } = require("console");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const { Schema, model } = mongoose;

main().catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose
        .connect("mongodb://127.0.0.1:27017/wikiDB")
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error(err);
        });
}

const articleSchema = new Schema({
    title: String,
    content: String,
});

const Article = model("Article", articleSchema);

///////////////////////////////////////////////////////////////  Request targeting all articles //////////////////////////////////

app.route("/articles")
    .get(async (req, res) => {
        Article.find()
            .exec()
            .then(function (article) {
                res.send(article);
            })
            .catch(function (error) {
                console.error("Couldn't find articles", error);
                res.send(500).json({ error: "Internal server error" }); // Sending a generic error response
            });
    })
    .post(async (req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
        });

        try {
            newArticle.save();
            res.send("Successfully saved new article");
        } catch {
            res.send("Couldn't save article", error);
        }
    })
    .delete(async (req, res) => {
        Article.deleteMany()
            .exec()
            .then(() => {
                res.send("Successfully deleted all articles");
            })
            .catch((err) => {
                res.send(err);
            });
    });

///////////////////////////////////////////////////////////////  Request targeting specific articles //////////////////////////////////

app.route("/articles/:articleTitle")
    .get(async (req, res) => {
        articleTitle = req.params.articleTitle;

        await Article.findOne({ title: articleTitle })
            .exec()
            .then((foundArticle) => {
                if (foundArticle) {
                    console.log(foundArticle.title);
                    console.log(req.params.articleTitle);
                    res.send(foundArticle);
                } else {
                    res.send("No articles matching that title was found");
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send(
                    "An error occurred while fetching the article."
                );
            });
    })
    .put(async (req, res) => {
        await Article.findOneAndUpdate(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            { returnOriginal: false }
        )
            .exec()
            .then(() => {
                res.send("Successfully updated the article.");
            })
            .catch((error) => {
                res.send(error);
            });
    })
    .patch(async (req, res) => {
        await Article.updateOne(
            { title: req.params.articleTitle },
            { $set: req.body }
        )
            .exec()
            .then(() => {
                res.send("Successfully updated the article.");
            })
            .catch((error) => {
                res.send(error);
            });
    })
    .delete(async (req, res) => {
        await Article.deleteOne({ title: req.params.articleTitle })
            .exec()
            .then(() => {
                res.send("Successfully deleted the corresponding article.");
            })
            .catch((error) => {
                res.send(error);
            });
    });

// Almost put and patch same here

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

// app.get("/articles", async (req, res) => {
//     Article.find()
//         .exec()
//         .then(function (article) {
//             res.send(article);
//         })
//         .catch(function (error) {
//             console.error("Couldn't find articles", error);
//             res.send(500).json({ error: "Internal server error" }); // Sending a generic error response
//         });

//     // try {
//     //     const query = Article.find();
//     //     const foundArticles = await query.exec();
//     //     res.send(foundArticles);
//     // } catch {
//     //     console.error("Couldn't find articles", error);
//     //     res.send(500).json({ error: "Internal server error" }); // Sending a generic error response
//     // }
// });

// app.post("/articles", async (req, res) => {
//     const newArticle = new Article({
//         title: req.body.title,
//         content: req.body.content,
//     });

//     try {
//         newArticle.save();
//         res.send("Successfully saved new article");
//     } catch {
//         res.send("Couldn't save article", error);
//     }
// });

// app.delete("/articles", async (req, res) => {
//     Article.deleteMany()
//         .exec()
//         .then(() => {
//             res.send("Successfully deleted all articles");
//         })
//         .catch((err) => {
//             res.send(err);
//         });
// });
