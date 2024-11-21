import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {


  private apiUrlComida = 'http://3.213.191.244:8000/menus/'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  obtenerComidas(): Observable<any[]> {
    // Realiza una solicitud HTTP GET para obtener los datos de las comidas
    return this.http.get<any[]>(this.apiUrlComida);
  }
}
