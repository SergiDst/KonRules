import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EjemploService {
  apiUrl = 'http://localhost:3000/api/ejemplos';
  constructor(private http: HttpClient) { }

  getAllEjemplosData(token: any): Observable<any> {

    return this.http.get(this.apiUrl+"ejemplos", {
      headers:
      {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      }
    });
  }
  addExample(exampleData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, exampleData);
}

updateExample(numeroArticulo: number | undefined, updatedFields: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${numeroArticulo}`, updatedFields);
}
eliminarEjemplo(title: string): Observable<any> {
  return this.http.delete<any>(this.apiUrl +'/' + title)
    .pipe(
      catchError(error => {
        // Manejar errores de respuesta del servidor
        console.error('Error al eliminar el ejemplo:', error);
        return throwError(error); // Relanzar el error para que pueda ser manejado por el componente
      })
    );
}
obtenerTodosLosEjemplos(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}

  
}
