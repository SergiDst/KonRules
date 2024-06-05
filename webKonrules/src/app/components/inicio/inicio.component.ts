import { Component } from '@angular/core';
import { EjemploService } from '../../services/ejemplo.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  ejemplos: any[] = [];

  constructor(private ejemploService: EjemploService) { }

  ngOnInit(): void {
    this.obtenerTodosLosEjemplos();
  }

  obtenerTodosLosEjemplos() {
    this.ejemploService.obtenerTodosLosEjemplos()
      .subscribe(
        ejemplos => {
          this.ejemplos = ejemplos;
          console.log(ejemplos)
        },
        error => {
          console.error('Error al obtener ejemplos:', error);
        }
      );
  }

}
