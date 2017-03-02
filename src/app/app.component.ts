import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private router: Router, private _firebaseService:FirebaseService) {
        this._firebaseService.isLoggedIn();
    }

    logout(){
        this._firebaseService.logout();
        this.router.navigate(['/login']);
    }
}
