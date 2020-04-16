var express = require("express");
var cors = require('cors')
var MongoClient = require("mongodb").MongoClient;
var app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());

var connectionString = "mongodb+srv://root:require35%23@loanpe-6kaop.mongodb.net/test?retryWrites=true&w=majority";


app.get("/",function(req,res){
	res.send("Hello World");
});

app.post("/login",function(req,res){
	var mobile_no = req.body.mobile_no;
	res.send(JSON.stringify({"msg":"recieved no "+mobile_no,"code":"LOGIN_SUC"}));
})

app.post("/signup",function(req,res){
	var username = req.body.username;
	var mobileNumber = req.body.mobileNumber;
	var city = req.body.city;
	var State = req.body.State;
	var University = req.body.University;
	var Course = req.body.Course;
	var Branch = req.body.Branch;
	var registrationNumber = req.body.registrationNumber;
	res.send(JSON.stringify({"msg":"Received Data Successfully \nName: "+username+"\nMobile Number: "+mobileNumber+"\nCity: "+city+"\nState:"+State+"\nUniversity: "+University+"\nCourse: "+Course+"\nBranch: "+Branch+"\nregistrationNumber: "+registrationNumber,"code":"success"}));
});

app.post("/test",function(req,res){
	const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
	client.connect(err => {
		if(err){
			res.send(JSON.stringify({"msg":err,"code":"DB_connection_err"}));
		}
		else{
			const collection = client.db("test").collection("test");
			collection.insertOne({"data":req.body.myInput},function(err, res){
				if(err){
					res.send(JSON.stringify({"msg":err,"code":"DB_INSERTION_err"}));
				}
				res.send(JSON.stringify({"msg":"inserted to database","code":"TEST_SUC"}));
			})
		}
		client.close();
	});
})

var server = app.listen("8080",function(){
	console.log("Starting Server at http://localhost:8080");
});
