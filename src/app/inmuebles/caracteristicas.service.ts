import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicasService {

  private serviciosUrl = 'http://3.213.191.244:8000/servicios';
  private serviciosInmueblesUrl = 'http://3.213.191.244:8000/servicios_inmuebles';

  constructor(private http: HttpClient) {}

  getServicios(): Observable<any[]> {
    return this.http.get<any[]>(this.serviciosUrl);
  }

  addServicioInmueble(idservicio: number, idinmueble: number): Observable<any> {
    return this.http.post(this.serviciosInmueblesUrl, { idservicio, idinmueble });
  }

  getServiciosInmueble(idinmueble: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.serviciosInmueblesUrl}/inmueble/${idinmueble}`);
  }
  
  deleteServicioInmueble(id: number): Observable<any> {
    return this.http.delete(`${this.serviciosInmueblesUrl}/${id}`);
  }
  
}
