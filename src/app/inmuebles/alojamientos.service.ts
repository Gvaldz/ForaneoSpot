import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { Inmueble } from './inmueble';
import { Caracteristicas } from './caracteristicas';
import { data } from 'autoprefixer';

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {

  private caracteristicasSubject = new BehaviorSubject<Caracteristicas[]>([]);
  caracteristicas$ = this.caracteristicasSubject.asObservable(); 
  private apiUrl = 'http://3.213.191.244:8000/';
  private apiservices = 'http://3.213.191.244:8000/servicios';
  private apiUrls: Record<string, string> = {
    Casa: 'http://3.213.191.244:8000/casas',
    Edificio: 'http://3.213.191.244:8000/edificios',
    Unidad: 'http://3.213.191.244:8000/unidades',
  };

  constructor(private http: HttpClient) {
  }

  addInmueble(tipo: string, datos: any): Observable<any> {
    return this.http.post(this.apiUrls[tipo], datos);
  }

  updateInmueble(id: number, inmueble: Inmueble): Observable<Inmueble> {
    return this.http.put<Inmueble>(`${this.apiUrl}/${id}`, inmueble).pipe(
      tap(() => this.obtenerAlojamientos())
    );
  }

  obtenerAlojamientos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'inmuebles/');
  }

  obtenerCasas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'casas/');
  }

  obtenerEdificios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'edificios/');
  }

  uploadImages(entity: string, entityId: number, files: File[]): Observable<any> {
    if (!entityId) {
        return throwError(() => new Error('El entityId es inválido'));
    }

    const formData = new FormData();
    formData.append('entity', entity);
    formData.append('entity_id', entityId.toString());

    files.forEach((file) => {
        formData.append('files', file);
    });

    return this.http.post<any>('http://3.213.191.244:8000/imagenes/upload-images/', formData);
  }
 
}
