import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  private baseOpiniones = 'http://3.213.191.244:8000/opiniones_comidas/vendedores';
  private apiUrl = 'http://3.213.191.244:8000/';

  constructor(private http: HttpClient) { }

  obtenerVendedores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'vendedores/');
  }

  obtenerVendedoresFavoritos(): Observable<any[]> {
    return this.http.get<any[]>('http://3.213.191.244:8000/vendedores_favoritos/');
  }


  agregarVendedorFavorito(id: number): Observable<any> {
    const body = { id_usuario_vendedor: id }; // Cambiamos la clave a id_usuario_vendedor
    return this.http.post<any>('http://3.213.191.244:8000/vendedores_favoritos/', body);
  }

  eliminarVendedorFavorito(idFavorito: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}vendedores_favoritos/${idFavorito}`);
  }

  obtenerDetallesVendedor(id: number): Observable<any> {
    return this.http.get<any>(`http://3.213.191.244:8000/vendedores/${id}`);
  }

  getOpiniones(vendedorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseOpiniones}/${vendedorId}`);
  }

  submitOpinion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}opiniones_comidas/`, data); // Enviar los datos a la API
  }

  obtenerMenusVendedor(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}menus/vendedor/${id}`)
  }

  updateOpinion(opinionId: number, data: {
    calificacion: number,
    descripcion: string
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}opiniones_comidas/${opinionId}/`, data);
  }
}
