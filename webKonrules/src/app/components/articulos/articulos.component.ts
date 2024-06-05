import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit{
  numeroArticulo: string = '';
  infoCapList: any = [];
  articulosList: any = [];
  constructor(
    private articuloService: ArticuloService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllArticulos();
  }
  getAllArticulos() {
    let numeroCap = localStorage.getItem('numeroCap')
    let numeroArticulo = localStorage.getItem('numeroArticulo')
    console.log(numeroArticulo)
    if(numeroArticulo){
      this.articuloService.getArt(numeroArticulo).subscribe(
        (data: any[])=>{
          this.articulosList = [data]
          console.log(this.articulosList)
          localStorage.removeItem('numeroArticulo');
        },
        (error) =>{
          console.error('Error fetching articles', error);
        }
      )
    }else{ 
    this.articuloService.getInfoCap(numeroCap).subscribe(
      (data: any[]) => {
        this.infoCapList = data;
        console.log(this.infoCapList)

      },
      (error) =>{
        console.error('Error fetching articles', error);
      }
    )
    this.articuloService.getAllArticulosCap(numeroCap).subscribe(
      (data: any[]) => {
        this.articulosList = data.flat();
        console.log(this.articulosList)
      },
      (error) => {
        console.error('Error fetching articles', error);
      }
    );
  }}
  verArticuloDeseado(numeroArticulo: string) {
    localStorage.setItem('numeroArticulo', numeroArticulo);
    console.log(numeroArticulo)
    location.reload()
    this.router.navigate(['/articulos']);
    
  }
  
  
}


