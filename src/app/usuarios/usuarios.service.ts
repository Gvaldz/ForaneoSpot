import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
