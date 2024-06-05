import { Component, OnInit } from '@angular/core';
import { CapituloService } from 'src/app/services/capitulo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capitulos',
  templateUrl: './capitulos.component.html',
  styleUrls: ['./capitulos.component.css']
})
export class CapitulosComponent implements OnInit{
  capitulosList: any = [];
  constructor(
    private capituloService: CapituloService,
    private router: Router
  ) {}


  ngOnInit() {
    this.getAllCapitulos();
  }
  
  getAllCapitulos() {
    this.capituloService.getAllCapitulosData(localStorage.getItem('access-token')).subscribe(
      (data: {}) => {
        this.capitulosList = data;
      },
      (error) => {
        console.error('Error fetching chapters', error);
      }
    );
  }
  verArticulos(numeroCap: string) {
    localStorage.setItem('numeroCap', numeroCap);
    this.router.navigate(['/articulos']);
  }
}


