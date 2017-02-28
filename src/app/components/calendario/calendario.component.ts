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
	open_modal: boolean;
	eventDrop: any;
	textoDialog: string;
	formatDate: string = "D MMM YYYY";
	today: string;

	constructor(private _eventosService:EventosService,
	              private router:Router) { }

	ngOnInit() {

		//this.today = new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate();

		this.open_modal = false;

		this.header = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,listMonth'			
			//right: 'month,agendaWeek,agendaDay,listMonth'
		};

		this.cargarEventos();
	}

	cargarEventos(){
		this.events = [];
		this._eventosService.getEventos()
		.subscribe(events =>{
			events.forEach(element => {
				let event = new Evento();
				event.id=element.$key;
				event.title=element.title;
				event.start=element.start;
				event.end=element.end;
				event.allDay=element.allDay;
				event.description = 'long description';
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
		this.eventDrop = event;
		
		this.textoDialog = "¿Seguro que quieres reprogramar el evento "+event.event.title+
							" para el "+event.event.start.format(this.formatDate)+"?";

		this._eventosService.getEvento(this.eventDrop.event.id).subscribe(
			event => {
				this.evento = event;
				this.evento.id = this.eventDrop.event.id;
				this.evento.start = this.eventDrop.event.start.format();
				if(this.eventDrop.event.end)
					this.evento.end = this.eventDrop.event.end.format();
				else
					this.evento.end = this.eventDrop.event.start.format();

				this.open_modal = true;						
			}
		);
	}

	handleEventResize(event){
		this.eventDrop = event;
		
		this.textoDialog = "¿Seguro que quieres reprogramar el evento "+
							event.event.title+" para que finalize el "+event.event.end.format(this.formatDate)+"?";

		this._eventosService.getEvento(this.eventDrop.event.id).subscribe(
			event => {
				this.evento = event;
				this.evento.id = this.eventDrop.event.id;
				this.evento.start = this.eventDrop.event.start.format();
				if(this.eventDrop.event.end)
					this.evento.end = this.eventDrop.event.end.format();
				else
					this.evento.end = this.eventDrop.event.start.format();

				this.open_modal = true;						
			}
		);
	}

	handleEventRender(event){
		event.element.qtip({
            content: event.event.description
        });
	}

	confirmarModal(){
		this._eventosService.updateEvento(this.evento.id,this.evento);
		this.cargarEventos();		
		this.open_modal = false;
	}

	cerrarModal(){
		this.eventDrop.revertFunc();
		this.open_modal = false;		
	}


}