import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mobile_no:number
  enter_otp=false;
  otp:number;
  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
  }
  VerifyOTP(){
    if(!this.otp || this.otp<1000 || this.otp>9999){
      alert("Enter Valid OTP");
    }else{
      let postData = {
        "mobile_no": this.mobile_no,
        "otp": this.otp
    }
    this.httpClient.post("http://localhost:8080/verifyOTP", postData, {})
      .subscribe(data => {
        if(data["code"]=="VERIFYOTP_SUC"){
          alert("Hurray! Mobile Verification Successful");
        }
        else{
          alert(JSON.stringify(data));
        }
       }, error => {
        console.log(error)
      });
    }
  }
  Validate(){
    if(this.mobile_no){
    var tmpNumber = this.mobile_no.toString();
    //Perform mobile number validation here
    if(tmpNumber.length!=10){
      alert("Invalid Number");
    }else if(tmpNumber[0] != "9" && tmpNumber[0] != "8" && tmpNumber[0] != "7" && tmpNumber[0] != "6"){
      alert("invalid number");
    }else{
      let postData = {
          "mobile_no": this.mobile_no
      }

      this.httpClient.post("http://localhost:8080/login", postData, {})
        .subscribe(data => {
          if(data["code"]=="OTP_SENT"){
            this.enter_otp=true;
          }
          else{
            alert(JSON.stringify(data));
          }
         }, error => {
          console.log(error)
        });
      /*let postData = new FormData();
      postData.append("mobile_no",this.mobile_no);
      this.http.post("http://localhost:8080/login", postData, {}).then(data => {
          alert(data);
      }).catch(err => {
          alert(err);
      });*/
    }
  }else{
    alert("Enter Valid Mobile Number");
  }
  }
}
