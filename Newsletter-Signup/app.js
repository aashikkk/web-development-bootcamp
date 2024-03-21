const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");
const { error } = require("console");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

client.setConfig({
    apiKey: "ef7b4733d41385a191e7de413f235448-us22",
    server: "us22",
});

// async function run() {
//     const response = await client.ping.get();
//     console.log(response);
// }

// run();

const subscribeToNewsletter = async (emailAddress, firstName, lastName) => {
    try {
        const response = await client.lists.batchListMembers("93e0c24270", {
            members: [
                {
                    email_address: emailAddress,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName,
                    },
                },
            ],
        });
        console.log(response);
    } catch (error) {
        throw new Error(`Failed to subscribe to newsletter: ${error.message}`);
    }
};

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", async (req, res) => {
    // var firstName = req.body.firstName;
    // var lastName = req.body.lastName;
    // var emailAddress = req.body.emailAddress;

    const { firstName, lastName, emailAddress } = req.body;

    try {
        await subscribeToNewsletter(emailAddress, firstName, lastName);
        res.sendFile(__dirname + "/success.html");
    } catch (error) {
        console.error("Error subscribing to newsletter:", error.message);
        res.status(500).sendFile(__dirname + "/failure.html");
    }
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log("Server is running on port 5000");
});

// API Key
// ef7b4733d41385a191e7de413f235448-us22

// Audience ID
// 93e0c24270

// Old method

// var data = {
//     members: [
//         {
//             email_address: emailAddress,
//             status: "subscribed",
//             merge_fields: {
//                 FNAME: firstName,
//                 LNAME: lastName,
//             },
//         },
//     ],
// };

// const jsonData = JSON.stringify(data);

// const url = "https://us22.api.mailchimp.com/3.0/93e0c24270";

// const options = {
//     method: "POST",
//     auth: "aashik1:ef7b4733d41385a191e7de413f235448-us22",
// };

// const request = https.request(url, options, (response) => {
//     response.on("data", (data) => {
//         console.log(JSON.parse(data));
//     });
// });

// request.write(jsonData);
// request.end();
