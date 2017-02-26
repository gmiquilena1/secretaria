import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from '../../models/evento';
import { EventosService } from '../../services/eventos.service';


@Component({
	selector: 'app-calendario',
	templateUrl: './calendario.component.html',
	styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

	es: any;
	evento: Evento;
	header: any;
	events: any[] = [];

	constructor(private _eventosService:EventosService,
	              private router:Router) { }

	ngOnInit() {

		this.es = {
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        };

		this.header = {
			left: 'prev,next today',
			center: 'title',
			//right: 'month,agendaWeek,agendaDay'
		};

		this._eventosService.getEventos()
		.subscribe(events =>{
			events.forEach(element => {
				let event = new Evento();
				event.id=element.$key;
				event.title=element.title;
				event.start=element.start;
				event.end=element.end;
				event.allDay=element.allDay;
				this.events.push(event);				
			});			
		})
	}

	handleDayClick(event) {
		this.router.navigate(['/nuevo_evento',event.date.format()]);
        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        // this.cd.detectChanges();
    }

	handleEventClick(e) {
		console.log(e.calEvent);
		this.router.navigate(['/editar_evento',e.calEvent.id]);
    }

	handleEventDrop(event){
		if (!confirm("Seguro que quieres reprogramar el evento "+event.event.title+"?"))
			event.revertFunc();
	}


}