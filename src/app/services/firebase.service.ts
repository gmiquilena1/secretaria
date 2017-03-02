import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseAuthState, AuthMethods, AngularFireAuth, FirebaseObjectObservable, AuthProviders} from 'angularfire2';

@Injectable()
export class FirebaseService {
  loggedIn: boolean;
  authData: any;

  constructor(private af: AngularFire) {
    this.loggedIn = false;
    this.af.auth.subscribe(auth => {
        if(auth!=null){
          this.authData = auth;
          this.loggedIn = true;  
        }        
      });    
  }

  getItem(key: string):FirebaseObjectObservable<any>{
    return this.af.database.object(key);
  }

  getList(item: string):FirebaseListObservable<any[]>{
    return this.af.database.list(item);
  }
  
  login(credenciales:any):firebase.Promise<FirebaseAuthState>{
    var creds: any = {email: credenciales.user, password: credenciales.pass};
    return this.af.auth.login(creds, {
          method: AuthMethods.Password,
          provider: AuthProviders.Password
        });
  }

  logout():any{
    this.af.auth.logout();    
  }   

  getAuth():AngularFireAuth{
    return this.af.auth;
  }

  isLoggedIn():boolean{
    return this.loggedIn;
  }

  setLoggedIn(logged: boolean){
    return this.loggedIn = logged;
  }

}