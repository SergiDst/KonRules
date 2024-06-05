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
  updateChapter: any = {
    numeroCap: '',
    titulo: '',
    numeroArticulos: '',
    palabrasClave: ''
  };
  deleteChapter: any = {
    numeroCap: ''
  };

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
  onUpdate() {
    const updatedChapter = {
      titulo: this.updateChapter.titulo,
      numeroArticulos: this.updateChapter.numeroArticulos,
      palabrasClave: this.updateChapter.palabrasClave.split(',').map((palabra: string) => palabra.trim())
    };
  
    this.capituloService.updateCapitulo(this.updateChapter.numeroCap, updatedChapter).subscribe(
      (response: any) => {
        console.log('Capítulo actualizado con éxito', response);
        this.toastr.success('Capítulo actualizado con éxito');
        this.updateChapter = {
          numeroCap: '',
          titulo: '',
          numeroArticulos: '',
          palabrasClave: ''
        };
        this.getAllCapitulos();
      },
      (error: any) => {
        console.error('Error al actualizar capítulo', error);
        this.toastr.error('Error al actualizar capítulo');
      }
    );
  }
  
  onDelete() {
    const numeroCap = this.deleteChapter.numeroCap;
    const verifyToken = this.verifyToken;

    this.capituloService.deleteCapitulo(numeroCap, verifyToken).subscribe(
      (response: any) => {
        console.log('Capítulo eliminado con éxito', response);
        this.toastr.success('Capítulo eliminado con éxito');
        this.deleteChapter = { numeroCap: '' };
        this.verifyToken = '';
        this.getAllCapitulos();
      },
      (error: any) => {
        console.error('Error al eliminar capítulo', error);
        this.toastr.error('Error al eliminar capítulo');
      }
    );
  }
  
  
  verArticulos(numeroCap: string) {
    localStorage.setItem('numeroCap', numeroCap);
    this.router.navigate(['/gestionarticulos']);
  }
}
