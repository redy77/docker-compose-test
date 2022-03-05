const express = require("express");
const { port, host, db, authApiUrl } = require("./configuration");
const { connectDb } = require("./helpers/db");
const mongoose = require("mongoose");
const app = express();
const axios = require("axios");

	app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

app.get("/testapidata", (req, res) => {
	res.json({
		testwithapi: true
	});
});

app.get('/testwithcurrentuser', (req, res) => {
	axios.get(authApiUrl + "/testforapi").then(
	response => {
		res.json({
		testwithcurrentuser: true,
		currentUserFromAuth: response.data
	});
  });
});
const postSchema = new mongoose.Schema({name:String});
const Post = mongoose.model("Post", postSchema);
const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`Our host is ${host}`);
    console.log(`Our database is ${db}`);
//	Post.find(function(err, posts){
	//	console.log('posts', posts);
	const silence = new Post({name:"Silence"});
	silence.save(function(err, savedSilence){
		if(err) return consile.log(err);
		console.log("savedSilence with volumes!!", savedSilence);
	});
  });
};

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
