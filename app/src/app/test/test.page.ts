import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  myInput:String;
  constructor(public http:HttpClient) { }

  ngOnInit() {
  }

  Send(){
    if(!this.myInput || this.myInput.length<5){
      alert("invalid input");
    }else{
      this.http.post("http://localhost:8080/test",{myInput:this.myInput}).subscribe(data=>{
        alert(JSON.stringify(data));
      },err=>{
        alert("Something went wrong while connecting to backend");
        console.log(err);
      });
    }
  }

}
