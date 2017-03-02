import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { DataTableModule, SharedModule, InputMaskModule, ScheduleModule } from 'primeng/primeng';

import { ROUTING } from "./app.routing";
import { firebaseConfig } from '../environments/firebase.config';

//directives
import { MaskInputDirective } from './directives/mask-input.directive';
import { UppercaseInputDirective } from './directives/uppercase-input.directive';

//services
import { FirebaseService } from './services/firebase.service';
import { MiembrosService } from './services/miembros.service';
import { EventosService } from './services/eventos.service';

//components
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';

import { CalendarioComponent } from './components/calendario/calendario.component';
import { FormEventoComponent } from './components/calendario/form-evento/form-evento.component';

import { ListaMiembrosComponent } from './components/miembros/lista-miembros/lista-miembros.component';
import { FormMiembroComponent } from './components/miembros/form-miembro/form-miembro.component';

import { MinisteriosComponent } from './components/ministerios/ministerios.component';
import { ArchivosComponent } from './components/archivos/archivos.component';

import { AuthGuardService } from './services/auth-guard.service';

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
}

@NgModule({
    declarations: [
        AppComponent,
        CalendarioComponent,
        ListaMiembrosComponent,
        MinisteriosComponent,
        ArchivosComponent,
        FormMiembroComponent,
        UppercaseInputDirective,
        FormEventoComponent,
        MaskInputDirective,
        LoginComponent,
        LayoutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DataTableModule,
        SharedModule,
        InputMaskModule,
        ScheduleModule,
        AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
        ClarityModule.forRoot(),
        ROUTING
    ],
    providers: [FirebaseService,MiembrosService,EventosService,AuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
