/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';

import { CalendarioComponent } from './components/calendario/calendario.component';
import { FormEventoComponent } from './components/calendario/form-evento/form-evento.component';

import { ListaMiembrosComponent } from './components/miembros/lista-miembros/lista-miembros.component';
import { FormMiembroComponent } from './components/miembros/form-miembro/form-miembro.component';

import { MinisteriosComponent } from './components/ministerios/ministerios.component';
import { ArchivosComponent } from './components/archivos/archivos.component';



export const ROUTES: Routes = [

    //{path: '', redirectTo: 'layout', pathMatch: 'full'},

    {path: '', component: LayoutComponent, canActivate: [AuthGuardService], children: [

        {path: '', redirectTo: 'miembros', canActivateChild: [AuthGuardService], pathMatch: 'full'},
        
        {path: 'miembros', component: ListaMiembrosComponent},
        {path: 'miembro', component: FormMiembroComponent},
        {path: 'miembro/:id', component: FormMiembroComponent},

        {path: 'calendario', component: CalendarioComponent},
        {path: 'nuevo_evento/:fecha', component: FormEventoComponent },
        {path: 'editar_evento/:id', component: FormEventoComponent },
        
        {path: 'ministerios', component: MinisteriosComponent },
        {path: 'archivos', component: ArchivosComponent },

    ]},

     {path: 'login', component: LoginComponent},    
    
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
