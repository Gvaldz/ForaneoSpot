import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {
  private apiUrlComida = 'http://3.213.191.244:8000/menus/'; 

  constructor(private http: HttpClient) {}

  obtenerComidas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlComida);
  }
}
