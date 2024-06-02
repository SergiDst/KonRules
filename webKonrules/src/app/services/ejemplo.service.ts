import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjemploService {
  apiUri = '/api/';
  constructor(private http: HttpClient) { }

  getAllEjemplosData(token: any): Observable<any> {

    return this.http.get(this.apiUri+"ejemplos", {
      headers:
      {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      }
    });
  }

  
}
