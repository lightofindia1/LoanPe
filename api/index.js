var express = require("express");
var cors = require("cors");
const AWS = require("aws-sdk"); //npm install aws-sdk
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config(); //npm install dotenv
var app = express();
var bodyParser = require("body-parser");
var connectionString = "mongodb://localhost:27017/";

function generateRandomNumber(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum) + minNum);
}

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/login", function (req, res) {
  var mobile_no = parseInt(req.body.mobile_no);
  var OTP = generateRandomNumber(1000, 9999);
  var params = {
    Message: "Welcome to LoanPe! Your OTP is: " + OTP /* required */,
    PhoneNumber: "+91" + mobile_no,
    MessageAttributes: {
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Transactional",
      },
    },
  };
  /*return new AWS.SNS({ apiVersion: "2010–03–31" })
    .publish(params)
    .promise()
    .then((message) => {
      res.send(
        JSON.stringify({ msg: "OTP sent successfully", code: "OTP_SENT" })
      );
    })
    .catch((err) => {
      res.send(JSON.stringify({ msg: err, code: "OTP_FAIL" }));
	});*/
  // TESTING PURPOSE ONLY
  MongoClient.connect(connectionString).then(db=>{
      var dbo = db.db("LoanPe");
      var myobj = { phoneNumber: mobile_no, otp: OTP};
      dbo.collection("login").insertOne(myobj).then(()=>{
        res.send(JSON.stringify({ msg: "OTP sent successfully", code: "OTP_SENT" }));
      }).catch(err=>{
        res.send(JSON.stringify({ msg: "Database Connection Error", code: "OTP_ERR_2" }));
      });
      otp_saved = true;
      db.close();
    }).catch(err=>{
        res.send(JSON.stringify({ msg: "Database Connection Error", code: "OTP_ERR_1" }));
    });
  
});

app.post("/verifyOTP", function (req, res) {
  var mobile_no = parseInt(req.body.mobile_no);
  var OTP = parseInt(req.body.otp);
  MongoClient.connect(connectionString).then(db=>{
    var dbo = db.db("LoanPe");
    var myobj = { phoneNumber: mobile_no, otp: OTP};
    dbo.collection("login").find(myobj).toArray().then(result=>{
      console.log(result);
      if(result && result.length>0){
        res.send(JSON.stringify({ msg: "Login Successfull", code: "VERIFYOTP_SUC" }));
      }else{
        res.send(JSON.stringify({ msg: "Invalid OTP Entered", code: "VERIFYOTP_ERR_3" }));
      }
    }).catch(err=>{
      res.send(JSON.stringify({ msg: "Database Connection Error", code: "VERIFYOTP_ERR_1" }));
    });
    db.close();
  }).catch(err=>{
      res.send(JSON.stringify({ msg: "Database Connection Error", code: "VERIFYOTP_ERR_2" }));
  });
});

var server = app.listen("8080", function () {
  console.log("Starting Server at http://localhost:8080");
});
