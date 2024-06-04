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

  addArticulo(articuloData: any, verifyToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': verifyToken
    });

    return this.http.post(this.apiUrl + '/articulo', articuloData, { headers });
  }
}
