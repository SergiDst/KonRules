import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-gestionarticulos',
  templateUrl: './gestionarticulos.component.html',
  styleUrls: ['./gestionarticulos.component.css']
})
export class GestionarticulosComponent implements OnInit {
  articulosList: any = [];
  newArticulo: any = {
    numeroCap: '',
    numeroArticulo: '',
    titulo: '',
    contenido: ''
  };
  verifyToken: string = '';

  constructor(
    private articuloService: ArticuloService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllArticulos();
  }

  

  onSubmit() {
    const newArticuloData = {
      numeroCap: this.newArticulo.numeroCap,
      numeroArticulo: this.newArticulo.numeroArticulo,
      titulo: this.newArticulo.titulo,
      contenido: this.newArticulo.contenido
    };

    this.articuloService.addArticulo(newArticuloData, this.verifyToken).subscribe(
      (response: any) => {
        console.log('Artículo añadido con éxito', response);
        this.toastr.success('Capítulo añadido con éxito');
        // Limpiar el formulario después de agregar el artículo
        this.newArticulo = {
          numeroCap: '',
          numeroArticulo: '',
          titulo: '',
          contenido: ''
        };
        this.verifyToken = ''; // Limpiar el campo Verify Token
        // Refrescar la lista de artículos después de agregar uno nuevo
        this.getAllArticulos();
      },
      (error: any) => {
        console.error('Error al añadir artículo', error);
        this.toastr.error('Error al añadir capítulo');
        // Manejar el error según sea necesario
      }
    );
  }
  getAllArticulos() {
    this.articuloService.getAllArticulosData().subscribe(
      (data: any[]) => {
        this.articulosList = data;
      },
      (error) => {
        console.error('Error fetching articles', error);
      }
    );
  }
}
