import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CapituloService {
  apiUri = '/api/';
  constructor(private http: HttpClient) { }

  getAllCapitulosData(token: any): Observable<any> {

    return this.http.get(this.apiUri+"capitulos", {
      headers:
      {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      }
    });
  }

 
}
