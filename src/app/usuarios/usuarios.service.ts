import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioBase, Foraneo, Vendedor, Arrendador } from './usuario-base';

type UsuarioTipo = 'Foraneo' | 'Vendedor' | 'Arrendador';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrls: Record<UsuarioTipo, string> = {
    Foraneo: 'http://3.213.191.244:8000/foraneos',
    Vendedor: 'http://3.213.191.244:8000/vendedores',
    Arrendador: 'http://3.213.191.244:8000/arrendadores',
  };

  constructor(private http: HttpClient) {}

  registrarUsuario(tipo: UsuarioTipo, datos: any): Observable<any> {
    return this.http.post(this.apiUrls[tipo], datos);
  }

  actualizarUsuario(tipo: UsuarioTipo, id: number, datos: any): Observable<any> {
    const url = `${this.apiUrls[tipo]}/${id}`;
    return this.http.put(url, datos);
  }

  obtenerForaneo(id: number): Observable<Foraneo> {
    return this.http.get<Foraneo>(`http://3.213.191.244:8000/foraneos/${id}`);
  }

  obtenerVendedor(id: number): Observable<Vendedor> {
    return this.http.get<Vendedor>(`http://3.213.191.244:8000/vendedores/${id}`);
  }

  obtenerArrendador(id: number): Observable<Arrendador> {
    return this.http.get<Arrendador>(`http://3.213.191.244:8000/arrendadores/${id}`);
  }

  eliminarForaneo(id: number): Observable<Foraneo> {
    return this.http.delete<Foraneo>(`http://3.213.191.244:8000/foraneos/${id}`);
  }

  elinminarVendedor(id: number): Observable<Vendedor> {
    return this.http.delete<Vendedor>(`http://3.213.191.244:8000/vendedores/${id}`);
  }

  eliminaarArrendador(id: number): Observable<Arrendador> {
    return this.http.delete<Arrendador>(`http://3.213.191.244:8000/arrendadores/${id}`);
  }

  uploadUserImage(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('entity', 'usuario');
    formData.append('entity_id', userId.toString());
    formData.append('files', file);
  
    return this.http.post<any>('http://3.213.191.244:8000/imagenes/upload-images/', formData);
  }
  
  deleteUserImage(imageId: number, entity: string): Observable<any> {
    const url = `http://3.213.191.244:8000/imagenes/delete-image/`;
    const body = new FormData();
    body.append('image_id', imageId.toString());
    body.append('entity', entity);
  
    return this.http.request('DELETE', url, { body });
  }
  
}
