var express = require("express");
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());

app.get("/",function(req,res){
	res.send("Hello World");
});

app.post("/login",function(req,res){
	var mobile_no = req.body.mobile_no;
	res.send(JSON.stringify({"msg":"recieved no "+mobile_no,"code":"LOGIN_SUC"}));
})

var server = app.listen("8080",function(){
	console.log("Starting Server at http://localhost:8080");
});
