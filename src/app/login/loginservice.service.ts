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

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<LoginResponse> {
    const body = { correo, contrasena };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<LoginResponse>(this.loginUrl, body, { headers })
      .pipe(
        tap(response => {
          if (response.token) {
            this.setToken(response.token); 
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

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
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
