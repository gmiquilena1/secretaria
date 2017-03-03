import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private _firebaseService: FirebaseService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this._firebaseService.getAuth().map((auth) => {
      if (auth) {
        console.log('authenticated');
        return true;
      }

      console.log('not authenticated');
      this.router.navigate(['/login']);
      return false;
    })

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
