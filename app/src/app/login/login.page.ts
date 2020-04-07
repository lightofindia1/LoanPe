import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mobile_no:string
  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
  }
  Validate(){
    //Perform mobile number validation here
    if(this.mobile_no.length!=10){
      alert("Invalid Number");
    }else if(this.mobile_no[0] != "9" && this.mobile_no[0] != "8" && this.mobile_no[0] != "7" && this.mobile_no[0] != "6"){
      alert("invalid number");
    }else{

      let postData = {
          "mobile_no": this.mobile_no
      }

      this.httpClient.post("http://localhost:8080/login", postData, {})
        .subscribe(data => {
          console.log(data)
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
  }
}
