var express = require("express"),
	app		= express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

var port = process.env.PORT || 3000;
app.listen(port, () =>{
	console.log("Server has started on port 3000");
});