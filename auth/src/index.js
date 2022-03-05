const express = require("express");
const {port, host, db, apiUrl, sendlerUrl} = require("./configuration");
const {connectDb} = require("./helpers/db");
const app = express();
const axios = require("axios");

app.get("/test", (req, res) => {
    res.send("Our auth server is working correctly");
});
app.get("/testforapi", (req, res) => {
    res.send("connectwithApiOK");
})
app.get("/currentUser", (req, res) => {
    axios.get(sendlerUrl + "/sendEmail").then(response => {
        res.json({
            id: "1234",
            email: "foo@gmail.com",
            sendEmail: response.data.message
        });
    });
});

app.get("/testwithapidata", (req, res) => {
    axios.get(apiUrl + "/testapidata").then(response => {
        res.json({
            testapidata: response.data.testwithapi
        });
    });
});

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port ${port}`);
        console.log(`Our host is ${host}`);
        console.log(`Our database is ${db}`);
    });
};

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);
