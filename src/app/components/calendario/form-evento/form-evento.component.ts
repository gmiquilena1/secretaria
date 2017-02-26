import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventosService } from '../../../services/eventos.service';
import { Evento } from '../../../models/evento';

@Component({
  selector: 'form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.scss']
})
export class FormEventoComponent implements OnInit {

  evento: Evento;
  title: String;
  id: string;
  fecha: string;

  constructor(private _eventosService:EventosService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id = null;
    
    this.activatedRoute.params.subscribe(params => this.id=params['id']);

    this.activatedRoute.params
      .switchMap((params: Params) => this._eventosService.getEvento(params['id']))
      .subscribe(evento => this.evento = evento);

     if(!this.id){
      this.evento = new Evento();
      this.title = "Nuevo Evento";
      this.activatedRoute.params.subscribe(params => {
        this.evento.start=params['fecha'];
        this.evento.end=params['fecha'];
      });
     }
     else
     {
        this.title = "Editar Evento";
     } 
  }

  volver(): void{
    this.router.navigate(['/calendario']);
  }

  eliminar(): void{
    this._eventosService.deleteEvento(this.id);
  }

  agregar():void{
    this.evento.title = this.evento.title.toUpperCase();
    
    if(this.id){
      this._eventosService.updateEvento(this.id,this.evento);
    }
    else
    {
      this._eventosService.addEvento(this.evento);
    }
    
    this.evento = new Evento();    
  }

}
