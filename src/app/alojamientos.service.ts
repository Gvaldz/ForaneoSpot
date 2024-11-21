import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {

  private apiUrl = 'http://3.213.191.244:8000/';

  constructor(private http: HttpClient) { }

  obtenerAlojamientos(): Observable<any[]> {
    // Realiza una solicitud HTTP GET para obtener los datos de las comidas
    return this.http.get<any[]>(this.apiUrl+'inmuebles/');
  }

  obtenerCasas(): Observable<any[]> {
    // Realiza una solicitud HTTP GET para obtener los datos de las comidas
    return this.http.get<any[]>(this.apiUrl+'casas/');
  }

  obtenerEdificios(): Observable<any[]> {
    // Realiza una solicitud HTTP GET para obtener los datos de las comidas
    return this.http.get<any[]>(this.apiUrl+'edificios/');
  }
}
