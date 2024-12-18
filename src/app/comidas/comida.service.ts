import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Comida } from './comida';
import { Pedido } from './pedido';
import { LoginserviceService } from '../login/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {
  private apiUrl = 'http://3.213.191.244:8000/menus'; 
  private pedidoUrl = 'http://3.213.191.244:8000/pedidos';
  private selectedComida = new BehaviorSubject<Comida | null>(null);
  selectedComida$ = this.selectedComida.asObservable();
  private comidasSubject = new BehaviorSubject<Comida[]>([]);
  comidas$ = this.comidasSubject.asObservable();

  constructor(private http: HttpClient, private loginService: LoginserviceService) {
    this.loginService.userRole$.subscribe(() => {
      this.loadComidas(true); 
    });

    this.loadComidas();
  }

  private loadComidas(forceReload: boolean = false): void {
    if (forceReload || this.comidasSubject.getValue().length === 0) {
      this.getComidas().subscribe(data => {
        this.comidasSubject.next(data);
      });
    }
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
  
  deleteOpinion(idopinion: number): Observable<any> {
    return this.http.delete(`http://3.213.191.244:8000/opiniones_comidas/${idopinion}`);
  }
  
  createPedido(comida: Comida, especificaciones: string): Observable<Pedido> {
    const pedido = {
      total: comida.precio,  
      cantidad: 1,           
      especificaciones: especificaciones,
      entregado: false,      
      id_menu: comida.id     
    };
    
    return this.http.post<Pedido>(this.pedidoUrl, pedido);
  }
}
