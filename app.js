var express = require("express"),
	app		= express();
const {Howl, Howler} = require('howler');

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/assets/sounds"));

app.get("/", (req, res) => {
	res.render("index");
});

var port = process.env.PORT || 3000;
app.listen(port, () =>{
	console.log("Server has started on port 3000");
});