const express = require("express");
const {port, host} = require("./configuration");
const app = express();
const startServer = () => {
    app.listen(port, () => {
        console.log(`Started sendler service on port ${port}`);
    });
};

startServer();

app.get("/sendEmail", (req, res) => {
    res.json({
        message: "sent email"
    });
});