import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-gestionarticulos',
  templateUrl: './gestionarticulos.component.html',
  styleUrls: ['./gestionarticulos.component.css']
})
export class GestionarticulosComponent {
  articulosList: any = [];
  idCapitulo: string | null = "";

  constructor(private articuloService: ArticuloService) { }

  ngOnInit(): void {    
    this.idCapitulo = localStorage.getItem('idCapitulo');
    console.log(this.idCapitulo);
    this.articuloService.getAllArticulosxCapituloData(this.idCapitulo).subscribe(
      (data: {}) => {
        this.articulosList = data
      }
    )
  }
  
}
