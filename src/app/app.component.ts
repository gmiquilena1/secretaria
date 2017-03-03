import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isLoggedIn:boolean;

    constructor(private router: Router, private _firebaseService:FirebaseService) {
        this.isLoggedIn = this._firebaseService.isLoggedIn();
    }

    logout(){        
        this.router.navigate(['/login']);
        this._firebaseService.logout();       
    }
}
