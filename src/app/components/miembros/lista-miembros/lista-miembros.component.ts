import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MiembrosService } from '../../../services/miembros.service';

@Component({
  selector: 'app-lista-miembros',
  templateUrl: './lista-miembros.component.html',
  styleUrls: ['./lista-miembros.component.scss']
})
export class ListaMiembrosComponent implements OnInit {

  listaMiembros: any[];
  selected: any;

  constructor(private _miembrosService:MiembrosService,
              private router:Router) { }

  ngOnInit() {
    this.selected = null;
    this._miembrosService.getMiembros().subscribe(lista => this.listaMiembros = lista);
  }

  agregarMiembro(): void{
    this.router.navigate(['/miembros/miembro']);
  }

  editarMiembro(): void{
    this.router.navigate(['/miembros/miembro',this.selected.$key]);
  }

  eliminarMiembro(){
    this._miembrosService.deleteMiembros(this.selected.$key);
  }

}
