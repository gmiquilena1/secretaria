/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { CalendarioComponent } from './components/calendario/calendario.component';
import { SchedulerComponent } from './components/calendario/scheduler/scheduler.component';
import { FormEventoComponent } from './components/calendario/form-evento/form-evento.component';

import { MiembrosComponent } from './components/miembros/miembros.component';
import { ListaMiembrosComponent } from './components/miembros/lista-miembros/lista-miembros.component';
import { FormMiembroComponent } from './components/miembros/form-miembro/form-miembro.component';

import { MinisteriosComponent } from './components/ministerios/ministerios.component';
import { ArchivosComponent } from './components/archivos/archivos.component';

export const ROUTES: Routes = [
    {path: '', redirectTo: 'miembros', pathMatch: 'full'},
    {path: 'miembros', component: MiembrosComponent,
        children: [
            { path: '', redirectTo: 'lista', pathMatch: 'full' },
            { path: 'lista', component: ListaMiembrosComponent},
            { path: 'miembro', component: FormMiembroComponent },
            { path: 'miembro/:id', component: FormMiembroComponent },
        ]
    },
    {path: 'calendario', component: CalendarioComponent,
        children: [
            { path: '', redirectTo: 'scheduler', pathMatch: 'full' },
            { path: 'scheduler', component: SchedulerComponent},
            { path: 'evento', component: FormEventoComponent },
        ]
    },
    {path: 'ministerios', component: MinisteriosComponent},
    {path: 'archivos', component: ArchivosComponent},
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
