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
  private apiUrl = 'http://3.213.191.244:8000';
  private apiservices = 'http://3.213.191.244:8000/servicios';
  private apiOpiniones = "http://3.213.191.244:8000/opiniones_inmuebles";
  private apiUrls: Record<string, string> = {
    Casa: 'http://3.213.191.244:8000/casas',
    Edificio: 'http://3.213.191.244:8000/edificios',
    Unidad: 'http://3.213.191.244:8000/unidades',
  };

  constructor(private http: HttpClient) {
  }

  getInmueblePorId(tipo: string, id: number) {
    const url = this.apiUrls[tipo];
    return this.http.get<any>(`${url}/${id}`);
    
  }

  agregarComentario(comentario: { idinmueble: string; calificacion: number; descripcion: string }): Observable<any> {
    return this.http.post(`${this.apiOpiniones}`, comentario);
  }
  

   // Método para agendar una visita
   agendarVisita(citaVisita: { idinmuebles: string; fecha: string; hora: string; realizada: boolean }): Observable<any> {
    return this.http.post(`${this.apiUrl}/citas_visitas`, citaVisita);
  }

  // Método para obtener comentarios
  obtenerComentarios(idInmueble: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiOpiniones}/inmuebles/${idInmueble}`);
  }

  obtenerAlojamientos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inmuebles`);
  }

  obtenerInmueblesPorServicio(servicioId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inmuebles/servicio/${servicioId}`);
  }

  addInmueble(tipo: string, datos: any): Observable<any> {
    return this.http.post(this.apiUrls[tipo], datos);
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

  updateInmueblePorTipo(tipo: string, id: number, datos: any): Observable<any> {
    const url = this.apiUrls[tipo];
    if (!url) {
      return throwError(() => new Error('Tipo de inmueble no válido'));
    }
    return this.http.put(`${url}/${id}`, datos);
  }
  
  deleteInmueblePorTipo(tipo: string, id: number): Observable<any> {
    const url = this.apiUrls[tipo];
    if (!url) {
      return throwError(() => new Error('Tipo de inmueble no válido'));
    }
    return this.http.delete(`${url}/${id}`);
  }

  deleteInmuebleImage(imageId: number, entity: string = 'inmueble'): Observable<any> {
    const url = `http://3.213.191.244:8000/imagenes/delete-image/`;
    const body = new FormData();
    body.append('image_id', imageId.toString());
    body.append('entity', entity); 
  
    console.log('Enviando solicitud para eliminar imagen con ID:', imageId);
  
    return this.http.request('DELETE', url, { body }).pipe(
      tap(response => {
        console.log('Respuesta del backend:', response);
      })
    );
  }
  
  
}
