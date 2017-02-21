import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { FirebaseListObservable } from 'angularfire2';

@Injectable()
export class EventosService {

  eventos: FirebaseListObservable<any[]>;

  constructor(private _fbService:FirebaseService) { 
    this.eventos = this._fbService.getList('/eventos');
  }

  getEventos():FirebaseListObservable<any[]>{
    return this.eventos;
  }

  addEvento(item){
    this.eventos.push(item);
  }

  updateEvento(id,item){
    this.eventos.update(id,item);
  }

  deleteEvento(id:any){
    this.eventos.remove(id);
  }

}
