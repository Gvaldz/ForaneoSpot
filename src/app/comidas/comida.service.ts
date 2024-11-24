import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Comida } from './comida';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {
  private apiUrl = 'http://3.213.191.244:8000/menus'; 

  private selectedComida = new BehaviorSubject<Comida | null>(null);
  selectedComida$ = this.selectedComida.asObservable();
  private comidasSubject = new BehaviorSubject<Comida[]>([]);
  comidas$ = this.comidasSubject.asObservable(); 

  constructor(private http: HttpClient) {
    this.loadComidas(); 
  }

  private loadComidas() {
    this.getComidas().subscribe(data => {
      this. comidasSubject.next(data);
    });
  }

  getComidas(): Observable<Comida[]> {
    return this.http.get<Comida[]>(this.apiUrl);
  }

  addComida(Comida: Comida): Observable<Comida> {
    return this.http.post<Comida>(this.apiUrl, Comida).pipe(
      tap(() => {
        this.loadComidas(); 
      })
    );
  }
  
  updateComida(id: number, Comida: Comida): Observable<Comida> {
    return this.http.put<Comida>(`${this.apiUrl}/${id}`, Comida).pipe(
      tap(() => {
        this.loadComidas(); 
      })
    );
  }

  deleteComida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.comidasSubject.next(
          this.comidasSubject.getValue().filter(p => p.id !== id)
        );
      })
    );
  }  

  selectComidaForEdit(Comida: Comida) {
    this.selectedComida.next(Comida);
  }

  uploadImages(entity: string, entityId: number, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('entity', entity);
    formData.append('entity_id', entityId.toString());
  
    files.forEach((file) => {
      formData.append('files', file);
    });
  
    return this.http.post<any>('http://3.213.191.244:8000/imagenes/upload-images/', formData);
  }
  
  
}
