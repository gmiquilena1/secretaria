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

  updateMiembro(id,item){
    return this.miembros.update(id,item)
  }

  deleteMiembros(id:any){
    return this.miembros.remove(id);
  }

}
