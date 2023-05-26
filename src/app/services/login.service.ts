import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private authService: AngularFireAuth
  ) { }

  sfunRegistrarse(email: string, password:string){
    return new Promise( (resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, password)
      .then(datos => resolve(datos),
      error => reject(error))
    });
  }

  sfunLogout(){
    this.authService.signOut();
  }

  sfunLogin(email: string, password:string){
    console.log('sfunLogin() => ',email);
    return new Promise( (resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, password)
      .then( datos => resolve(datos),
        error => reject(error)
      );
    });
  }

  sfunGetAuth(){
    return this.authService.authState.pipe(
      map( auth => auth)
    );
  }

}
