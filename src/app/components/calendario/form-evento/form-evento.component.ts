import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventosService } from '../../../services/eventos.service';
import { Evento } from '../../../models/evento';

@Component({
  selector: 'form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.scss']
})
export class FormEventoComponent implements OnInit {

  @Input()
  mostrar: boolean;

  @Input()
  evento: Evento;

  @Output()
  change: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _eventosService:EventosService) { }

  ngOnInit() {
    
  }

  cerrarForm(): void{
    this.mostrar = false;
    this.change.emit(this.mostrar);
  }

  agregar():void{
    this.evento.title = this.evento.title.toUpperCase();
    
    if(this.evento.id){
      let auxEvento = new Evento();
      auxEvento.title = this.evento.title;
      auxEvento.start = this.evento.start;
      auxEvento.end = this.evento.end;
      auxEvento.allDay = this.evento.allDay;
      auxEvento.observation = this.evento.observation;
      this._eventosService.updateEvento(this.evento.id,auxEvento);
    }
    else
    {
      this._eventosService.addEvento(this.evento);
    }
    
    this.evento = new Evento();    
  }

}
