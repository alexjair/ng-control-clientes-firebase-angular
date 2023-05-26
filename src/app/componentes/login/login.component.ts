import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  vErrorMsg: string = '';
  vErrorMostrar: boolean = false;
  email:string ="";
  password:string ="";

  funLogin() {
    this.loginService.sfunLogin(this.email, this.password)
    .then( res => {
      alert("Bienvenido!! user: "+ this.email);
      //console.log({res});
      this.router.navigate(['/'])
    })
    .catch(error => {
      this.vErrorMsg  = error.message;
      this.vErrorMostrar = true;
    })
  }

  ngOnInit(): void {
    this.loginService.sfunGetAuth().subscribe( resp => {
      if(resp){
        this.router.navigate(['/']);
      }
    });
  }

}
