import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private configuracionService: ConfiguracionService,
  ) { }

  isLoggedIn: boolean = false;
  loggedInUser: string | null = null;

  permitirRegistro: boolean | undefined = false;

  funLogout(){
    this.loginService.sfunLogout();
    //Cerramos session
    this.isLoggedIn = false;
    this.loggedInUser = null;
    //ir inicio
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.loginService.sfunGetAuth().subscribe( auth =>{
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn = false;
        this.loggedInUser = null;
      }
    });

    this.configuracionService.sfunGetConfiguracion().subscribe( resp =>{
      this.permitirRegistro = resp?.permitirRegistro;
    })
  }

}
