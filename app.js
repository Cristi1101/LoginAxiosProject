// import-urile librariilor instalate in node modules
var bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const express = require("express");
const axios = require("axios");

const port = 12345;
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//POST
app.post('/login', (req, res) => {
    let rawdata = fs.readFileSync("users.json"); //fs - librarie pt citirea fisierului
    let jsonResponse = JSON.parse(rawdata); //pt a parsa rawdata in json
    let credentials = req.body;
    let result = {
        id: -1,
        role: ""
    };

    jsonResponse.users.forEach(element => {
        if (element.user == credentials.email && element.password == credentials.password) {
            result = {
                id: element.id,
                role: element.role
            };
        }
    });

    res.json(result);
});

//GET
app.get('/axio', (req, res) => {
    let elemente = new Array();

    axios.get("https://jsonplaceholder.typicode.com/photos").then((response) => {
        response.data.forEach(element => {
            if (element.id <= 15) {
                elemente.push(element.url);
            }
        });
        res.json({ message: "Data received!", elemente });
        console.log("elementURL: ", elemente);

    }).catch(function (error) { //in caz de eroare intra in catch
        console.log(error);
    });
});

app.listen(port, () => {
    console.log(`server running on ${port}/`);
})