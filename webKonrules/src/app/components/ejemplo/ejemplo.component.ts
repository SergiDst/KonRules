import { Component } from '@angular/core';
import { EjemploService } from 'src/app/services/ejemplo.service';

@Component({
  selector: 'app-ejemplo',
  templateUrl: './ejemplo.component.html',
  styleUrls: ['./ejemplo.component.css']
})
export class EjemploComponent {
  ejemploList: any = [];

  constructor(private ejemploService: EjemploService) {
  }

  ngOnInit() {
    this.getAllEjemplos();
  }


  getAllEjemplos() {
    this.ejemploService.getAllEjemplosData(localStorage.getItem('accessToken')).subscribe(
      (data: {}) => {
        this.ejemploList = data
      }
    );
  }
}
