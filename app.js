const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = 3000;

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", function (req, res) {

    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us2.api.mailchimp.com/3.0/lists/676cd7779a";
    const options = {
        method: "POST",
        auth: "aweperi:9ea37a5c24f754192667f4f93705f097-us2"
    }

    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.listen(port, function () {
    console.log(`Server listening at localhost:${port}`);
})

// API Key
// 9ea37a5c24f754192667f4f93705f097-us2

// List ID
// 676cd7779a

// const client = require("mailchimp-marketing");

// client.setConfig({
//   apiKey: "YOUR_API_KEY",
//   server: "YOUR_SERVER_PREFIX",
// });

// const run = async () => {
//   const response = await client.lists.batchListMembers("list_id", {
//     members: [{}],
//   });
//   console.log(response);
// };

// run();