import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class MiembrosService {

miembros: FirebaseListObservable<any[]>;

  constructor(private _fbService:FirebaseService) { 
    this.miembros = this._fbService.getList('/miembros');
  }

  getMiembro(key: string):FirebaseObjectObservable<any>{
    return this._fbService.getItem('/miembros/'+key);
  }

  getMiembros():FirebaseListObservable<any[]>{
    return this.miembros;
  }

  addMiembro(item){
     this.miembros.push(item);
  }

  updateMiembro(key,item){
    const itemObservable = this._fbService.getItem('/miembros/'+key);
    return itemObservable.update(item);
  }

  deleteMiembros(id:any){
    return this.miembros.remove(id);
  }

}
