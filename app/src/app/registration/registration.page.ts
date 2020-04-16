import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  username:String;
  mobileNumber:String;
  city:String;
  State:String;
  University:string;
  Course:string;
  Branch:string;
  registrationNumber:string;
  constructor(public httpClient: HttpClient) { }
  ngOnInit() {
  }

  submit(){
    if(!this.username || this.username.length<5){
      alert("Invalid User Name");
    }else if(!this.mobileNumber || this.mobileNumber.length!=10){
      alert("Invalid Mobile Number");
    }else if(!this.State || this.State.length<5){
      alert("Invalid State")
    }else if(!this.University || this.University.length<15){
      alert("Invalid University");
    }else if(!this.Course || this.Course.length<5){
      alert("Invalid Course");
    }else if(!this.Branch || this.Branch.length<21){
      alert("Invalid Branch")
    }else if(!this.registrationNumber || this.registrationNumber.length<13){
      alert("registrationNumber")
    }else{
      let postData = {
        "username": this.username,
        "mobileNumber": this.mobileNumber,
        "city": this.city,
        "State": this.State,
        "University": this.University,
        "Course": this.Course,
        "Branch": this.Branch,
        "registrationNumber": this.registrationNumber
    }
    this.httpClient.post("http://localhost:8080/signup", postData, {})
    .subscribe(data => {
      alert(JSON.stringify(data));
     }, error => {
      alert(JSON.stringify(error));
    });
    }
  }
}
