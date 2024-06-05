import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CapituloService {
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAllCapitulosData(token: string | null): Observable<any> {
    return this.http.get(this.apiUrl + '/capitulos', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        accessToken: `${token}`
      })
    });
  }

  addCapitulo(capitulo: any, verifyToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': verifyToken
    });

    return this.http.post(this.apiUrl + '/capitulos', capitulo, { headers });
  }
  updateCapitulo(numeroCap: number, chapter: any): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/capitulos/${numeroCap}`, chapter);
  }

  deleteCapitulo(numeroCap: number, verifyToken: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/capitulos/${numeroCap}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-token': verifyToken
      }),
      body: { verifyToken }
    });
  }
}
