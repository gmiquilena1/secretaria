import { Component, OnInit } from '@angular/core';
import { Evento } from '../../models/evento';
import { EventosService } from '../../services/eventos.service';


@Component({
	selector: 'app-calendario',
	templateUrl: './calendario.component.html',
	styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

	agregarEvento: boolean;
	evento: Evento;
	header: any;
	events: any[];

	constructor(private _eventosService:EventosService) { }

	ngOnInit() {
		this.agregarEvento = false;
	
		this.header = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};

		this._eventosService.getEventos()
		.subscribe(events => this.events=events)
	}

	handleDayClick(event) {
		console.log(event.date.format());
        this.evento = new Evento();
		this.evento.start = event.date.format();
		this.evento.end = event.date.format(); 
		this.agregarEvento = true;
        
        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        // this.cd.detectChanges();
    }

	handleEventClick(e) {
        this.evento = new Evento();
        this.evento.title = e.calEvent.title;
        
        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if(e.view.name === 'month') {
            start.stripTime();
        }
        
        if(end) {
            end.stripTime();
			this.evento.end = end.format();
        }

        this.evento.id = e.calEvent.$key;
        this.evento.start = start.format();
        this.evento.allDay = e.calEvent.allDay;
		console.log(e.calEvent);
		this.agregarEvento = true;
    }

	agregarChange(event) {
    	this.agregarEvento = event;
  	}



}