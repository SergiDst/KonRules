import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CapituloService } from 'src/app/services/capitulo.service';

@Component({
  selector: 'app-gestioncapitulos',
  templateUrl: './gestioncapitulos.component.html',
  styleUrls: ['./gestioncapitulos.component.css']
})
export class GestioncapitulosComponent implements OnInit {
  capitulosList: any = [];
  newChapter: any = {
    numeroCap: '',
    titulo: '',
    numeroArticulos: '',
    palabrasClave: ''
  };
  verifyToken: string = '';

  constructor(
    private capituloService: CapituloService,
    private router: Router,
    private toastr: ToastrService
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

  onSubmit() {
    // Otros campos del nuevo capítulo
    const newChapter = {
      numeroCap: this.newChapter.numeroCap,
      titulo: this.newChapter.titulo,
      numeroArticulos: this.newChapter.numeroArticulos,
      palabrasClave: this.newChapter.palabrasClave
    };
  
    // Añadir el capítulo utilizando el servicio CapituloService
    this.capituloService.addCapitulo(newChapter, this.verifyToken).subscribe(
      (response: any) => {
        console.log('Capítulo añadido con éxito', response);
        this.toastr.success('Capítulo añadido con éxito');
        // Limpiar el formulario después de agregar el capítulo
        this.newChapter = {
          numeroCap: '',
          titulo: '',
          numeroArticulos: '',
          palabrasClave: ''
        };
        this.verifyToken = ''; // Limpiar el campo Verify Token
        this.getAllCapitulos();  // Refrescar la lista de capítulos después de agregar uno nuevo
      },
      (error: any) => {
        console.error('Error al añadir capítulo', error);
        this.toastr.error('Error al añadir capítulo');
      }
    );
  }
  
  verArticulos(numeroCap: string) {
    localStorage.setItem('numeroCap', numeroCap);
    this.router.navigate(['/gestionarticulos']);
  }
}
