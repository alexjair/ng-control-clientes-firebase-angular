import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    ) { }

  vErrorMsg: string = '';
  vErrorMostrar: boolean = false;
  email:string ="";
  password:string ="";

  funRegistro(){
    this.loginService.sfunRegistrarse(this.email, this.password).then(
      resp => {
        alert("Usuario Registrado: "+this.email);
        this.router.navigate(['/']);
      }
    ).catch(error =>{
      this.vErrorMsg  = error.message;
      this.vErrorMostrar = true;
    });
  }

  ngOnInit(): void {
    this.loginService.sfunGetAuth().subscribe( resp => {
      if(resp){
        this.router.navigate(['/']);
      }
    });
  }

}
