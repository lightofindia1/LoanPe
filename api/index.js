var express = require("express");
var cors = require("cors");
const AWS = require("aws-sdk"); //npm install aws-sdk
require("dotenv").config(); //npm install dotenv
var app = express();
var bodyParser = require("body-parser");

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
  var mobile_no = req.body.mobile_no;
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
  res.send(JSON.stringify({ msg: "OTP sent successfully", code: "OTP_SENT" }));
});

var server = app.listen("8080", function () {
  console.log("Starting Server at http://localhost:8080");
});
