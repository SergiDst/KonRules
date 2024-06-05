import { Component } from '@angular/core';
import { EjemploService } from '../../../services/ejemplo.service';


@Component({
  selector: 'app-gestionejemplos',
  templateUrl: './gestionejemplos.component.html',
  styleUrls: ['./gestionejemplos.component.css']
})
export class GestionejemplosComponent {
  numeroArticulo: number | undefined;
  title = '';
  descripcion = '';
  image = '';
 updatedArticle = {
    title: this.title,
    descripcion: this.descripcion,
    image: this.image
};
deleteExample = { title: '' };
ejemplos: any[] = [];

  constructor(private EjemploService: EjemploService) {}

  ngOnInit(): void {
    this.obtenerTodosLosEjemplos();
  }

  onSubmit() {
    if (this.numeroArticulo !== undefined) {
      const exampleData = {
          numeroArticulo: this.numeroArticulo,
          title: this.title,
          descripcion: this.descripcion,
          image: this.image
      };

      this.EjemploService.addExample(exampleData).subscribe(
          response => {
              console.log('Example added:', response);
              this.resetForm();
          },
          error => {
              console.error('Error adding example:', error);
          }
      );
  }
  }
  onUpdate() {
    

    if (this.numeroArticulo !== null) {
        this.EjemploService.updateExample(this.numeroArticulo, this.updatedArticle).subscribe(
            response => {
                console.log('Artículo actualizado:', response);
                this.resetForm();
            },
            error => {
                console.error('Error al actualizar el artículo:', error);
            }
        );
    }
}
onDelete() {
    this.EjemploService.eliminarEjemplo(this.deleteExample.title)
      .subscribe(
        () => {
          console.log('Ejemplo eliminado exitosamente');
          // Aquí puedes agregar cualquier lógica adicional, como actualizar la lista de ejemplos
        },
        error => {
          console.error('Error al eliminar el ejemplo:', error);
          if (error.error && typeof error.error === 'string') {
            console.log('Mensaje del servidor:', error.error);
          } else {
            console.log('Respuesta del servidor no es un mensaje de texto simple:', error.error);
          }
        }
      );
  }
  obtenerTodosLosEjemplos() {
    this.EjemploService.obtenerTodosLosEjemplos()
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

  resetForm() {
    this.numeroArticulo = undefined;
    this.title = '';
    this.descripcion = '';
    this.image = '';
}

  
}
