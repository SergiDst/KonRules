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
  updatedArticulo: any = {};
  deleteArt: any = {
    numeroArticuloDelete: ''
  };
  

  constructor(
    private articuloService: ArticuloService,
    private toastr: ToastrService
  ) {
    
   }

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
  onUpdate() {
    const updatedArticuloData = {
      numeroCap: this.updatedArticulo.numeroCap,
      numeroArticulo: this.updatedArticulo.numeroArticulo,
      titulo: this.updatedArticulo.titulo,
      contenido: this.updatedArticulo.contenido
    };

    this.articuloService.updateArticulo(updatedArticuloData).subscribe(
      (response: any) => {
        console.log('Artículo actualizado con éxito', response);
        this.toastr.success('Artículo actualizado con éxito');
        // Limpiar el formulario después de actualizar el artículo
        this.updatedArticulo = {
          numeroCap: '',
          numeroArticulo: '',
          titulo: '',
          contenido: ''
        };
        // Refrescar la lista de artículos después de actualizar uno
        this.getAllArticulos();
      },
      (error: any) => {
        console.error('Error al actualizar artículo', error);
        this.toastr.error('Error al actualizar artículo');
        // Manejar el error según sea necesario
      }
    );
  }

  onDelete() {
    const numeroArticulo = this.deleteArt.numeroArticulo;
    const verifyToken = this.verifyToken;
    console.log(numeroArticulo)
    this.articuloService.deleteArticulo(numeroArticulo, verifyToken).subscribe(
      (response: any) => {
        console.log('Capítulo eliminado con éxito', response);
        this.toastr.success('Capítulo eliminado con éxito');
        this.deleteArt = { numeroArticulo: '' };
        this.verifyToken = '';
        this.getAllArticulos();
      },
      (error: any) => {
        console.error('Error al eliminar capítulo', error);
        this.toastr.error('Error al eliminar capítulo');
      }
    );
  }

  getAllArticulos() {
    let numeroCap = localStorage.getItem('numeroCap')
    console.log(numeroCap)
    if(numeroCap != '' && numeroCap != null){ 
    this.articuloService.getAllArticulosCap(numeroCap).subscribe(
      (data: any[]) => {
        this.articulosList = data.flat();
        console.log(this.articulosList)
        localStorage.clear()
      },
      (error) => {
        console.error('Error fetching articles', error);
      }
    );}else{
      
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
}
