import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  vErrorMsg: string = '';
  vErrorMostrar: boolean = false;
  email:string ="";
  password:string ="";

  funLogin() {
  }

  ngOnInit(): void {
  }

}
