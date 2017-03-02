import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credenciales: any = {user:"",pass:""};
  error: boolean;
  mensajeError: string;

  constructor(private router: Router, private _firebaseService: FirebaseService) { }

  ngOnInit() {   
  }

  login(){
    this._firebaseService.login(this.credenciales).then( state => {
        this._firebaseService.setLoggedIn(true);
        this.router.navigate(['/miembros']);      
    }).catch( error => {
      this.error = true;
      console.log(error.message);
      if(error.message=="The email address is badly formatted." || 
      error.message=="There is no user record corresponding to this identifier. The user may have been deleted."){
        this.mensajeError = "Usuario Invalido";
      }
      if(error.message=="The password is invalid or the user does not have a password."){
        this.mensajeError = "Contraseña Incorrecta";
      }
    });
    
  }

}
