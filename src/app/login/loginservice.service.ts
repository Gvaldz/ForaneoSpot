import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse } from './loginIU';
import { DecodedToken } from './decoded-token';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  private loginUrl = 'http://3.213.191.244:8000/login';
  private authTokenKey = 'authToken';
  private userRoleKey = 'userRole'; 
  private userIdKey = 'userId'; 

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userRoleSubject = new BehaviorSubject<string | null>(this.getUserRole());
  public userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<any> {
    const body = { correo, contrasena };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post(this.loginUrl, body, { headers, observe: 'response' })
      .pipe(
        tap(response => {
          const token = response.headers.get('Authorization'); 
          if (token) {
            const cleanedToken = token.replace('Bearer ', ''); 
            this.setToken(cleanedToken);
            const decodedToken = this.getDecodedToken(cleanedToken);
  
            if (decodedToken && decodedToken.role) {
              this.setUserRole(decodedToken.role);
              this.setUserId(decodedToken.sub);
            } else {
              console.error('Rol no encontrado en el token.');
            }
  
            this.isLoggedInSubject.next(true);
          } else {
            console.error('No se encontró el token en los encabezados.');
          }
        }),
        catchError(this.handleError)
      );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  private setUserRole(role: string): void {
    localStorage.setItem(this.userRoleKey, role);
    this.userRoleSubject.next(role); // Emitir cambio
  }

  private setUserId(id: string): void {
    localStorage.setItem(this.userIdKey, id);  
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.userRoleKey);
  }

  getUserId(): number | null {
    const id = localStorage.getItem(this.userIdKey);
    return id ? parseInt(id, 10) : null;
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userRoleKey);
    localStorage.removeItem(this.userIdKey);
    this.isLoggedInSubject.next(false);
    this.userRoleSubject.next(null); 
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getDecodedToken(token: string): DecodedToken | null {
    try {
      const payloadBase64 = token.split('.')[1]; 
      const payloadJson = atob(payloadBase64);  
      return JSON.parse(payloadJson) as DecodedToken;
    } catch (error) {
      return null;
    }
  }
}
