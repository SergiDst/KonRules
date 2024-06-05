import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  apiUrl = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) { }

  getAllArticulosData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/articulos`);
  }
  getAllArticulosCap(numeroCap: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/articulos/${numeroCap}`);
  }
  getInfoCap(numeroCap: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/capitulos/${numeroCap}`);
  }
  getArt(numeroArticulo: string | null): Observable<any>{
    return this.http.get(`${this.apiUrl}/articulo/numero/${numeroArticulo}`)
  }
  addArticulo(articuloData: any, verifyToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': verifyToken
    });

    return this.http.post(this.apiUrl + '/articulo', articuloData, { headers });
  }

  updateArticulo(articuloData: any): Observable<any> {
    // Realizar la solicitud PUT al backend para actualizar el artículo
    return this.http.put(`${this.apiUrl}/articulo/${articuloData.numeroArticulo}`, articuloData);
  }
  deleteArticulo(numeroArticulo: number, verifyToken: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/articulo/${numeroArticulo}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-token': verifyToken
      }),
      body: { verifyToken }
    });
} 
}
