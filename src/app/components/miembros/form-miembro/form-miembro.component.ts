import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Miembro } from '../../../models/miembro';
import { MiembrosService } from '../../../services/miembros.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'form-miembro',
  templateUrl: './form-miembro.component.html',
  styleUrls: ['./form-miembro.component.scss']
})
export class FormMiembroComponent implements OnInit {

  miembro: Miembro;
  id: string;

  constructor(private _miembrosService:MiembrosService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id = null;
    
    this.activatedRoute.params.subscribe(params => this.id=params['id']);

    this.activatedRoute.params
      .switchMap((params: Params) => this._miembrosService.getMiembro(params['id']))
      .subscribe(miembro => this.miembro = miembro);

     if(!this.id)
      this.miembro = new Miembro(); 
  }

  volver(): void{
    this.router.navigate(['/miembros']);
  }

  guardar():void{

    this.miembro.nombre = this.miembro.nombre.toUpperCase();
    this.miembro.apellido = this.miembro.apellido.toUpperCase();

    if(this.miembro.cedula)
       this.miembro.cedula=this.miembro.cedula.toUpperCase();
    
    console.log(this.miembro);

    if(this.id)    
      this._miembrosService.updateMiembro(this.id,this.miembro);
    else
      this._miembrosService.addMiembro(this.miembro);      
    
  }

  eliminar(){
    this._miembrosService.deleteMiembros(this.id);
  }

}
