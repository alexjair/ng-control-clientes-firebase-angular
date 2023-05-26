import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
      private router: Router,
      private angularFireAuth : AngularFireAuth,
  ) { }

  canActivate(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(
      map( auth => {
        if( !auth){
          this.router.navigate(['/login']);
          return false;
        }
        else{
          return true;
        }
      })
    )
  }

  /*
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
 */

}

