import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  apiUri = '/api/';
  constructor(private http: HttpClient) { }

  getAllArticulosxCapituloData(idCapitulo: any): Observable<any> {

    return this.http.get(this.apiUri+"capitulos/"+idCapitulo, {
      headers:
      {
        'Content-Type': 'application/json'
      }
    });
  }
}
