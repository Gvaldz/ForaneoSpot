import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
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

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<LoginResponse> {
    const body = { correo, contrasena };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<LoginResponse>(this.loginUrl, body, { headers })
      .pipe(
        tap(response => {
          console.log("respuesta: " + response)
          if (response.token) {
            this.setToken(response.token);
            const decodedToken = this.getDecodedToken(response.token);  
            
            if (decodedToken && decodedToken.role) {
              this.setUserRole(decodedToken.role); 
              this.setUserId(decodedToken.sub)
            } else {
              console.error('Rol no encontrado en el token');
            }
            
            this.isLoggedInSubject.next(true);
          } else {
            console.error('No se encontró el token en la respuesta.');
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
  }
  
  private setUserId(id: string): void {
    localStorage.setItem(this.userIdKey, id);  
  }

  getToken(): string | null{
    const token = localStorage.getItem('authToken')
    return token
  }

  getUserRole(): string | null {
    const role = localStorage.getItem('userRole');
    return role;
  }

  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? parseInt(id, 10) : null;
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userRoleKey); 
    this.isLoggedInSubject.next(false);
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
