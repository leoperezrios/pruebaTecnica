import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserResponse } from '../login/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    const API_USER =
      'https://prueba-tecnica-idecide.azurewebsites.net/api/usuarios';

    return this.http.get<any>(API_USER).pipe(catchError(this.handlerError));
  }
  getById(userId: number): Observable<User> {
    const API_USER =
      'https://prueba-tecnica-idecide.azurewebsites.net/api/usuarios';

    return this.http.get<any>(API_USER).pipe(catchError(this.handlerError));
  }
  new(user: User): Observable<User> {
    const API_USER =
      'https://prueba-tecnica-idecide.azurewebsites.net/api/usuarios';

    return this.http
      .post<User>(API_USER, user)
      .pipe(catchError(this.handlerError));
  }

  update(userId: number, user: any): Observable<User> {
    const API_USER =
      'https://prueba-tecnica-idecide.azurewebsites.net/api/usuarios';

    return this.http
      .patch<User>(`${API_USER}/${userId}`, user)
      .pipe(catchError(this.handlerError));
  }
  delete(userId: number): Observable<{}> {
    const API_USER =
      'https://prueba-tecnica-idecide.azurewebsites.net/api/usuarios';

    return this.http
      .delete<User>(`${API_USER}/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: any): Observable<never> {
    let errorMessage = 'Error!!';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
