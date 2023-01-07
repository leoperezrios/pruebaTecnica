import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, UserResponse, Roles } from './user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_LOGIN =
    'https://prueba-tecnica-idecide.azurewebsites.net/api/auth/login';

  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Roles>('');
private userToken = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isAdmin$(): Observable<string> {
    return this.role.asObservable();
  }

  get userTokenValue (): string{
    return this.userToken.getValue();
  }

  login(data: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(this.API_LOGIN, data).pipe(
      map((res: UserResponse) => {        
        this.saveLocalStorage(res);
        this.loggedIn.next(true);
        this.role.next(res.usuario.rol);
        this.userToken.next(res.token);
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.role.next('');
    this.userToken.next('');
    this.router.navigate(['/login'])
  }

  private checkToken(): void {
    var user = localStorage.getItem('user') || null;
    var data = JSON.stringify(user);
    const dat = JSON.parse(data);
    console.log(dat);

    if(dat){
      const isExpired = helper.isTokenExpired(dat.token);
      if(isExpired){
        this.logout();
      }else{
        this.loggedIn.next(true);
        this.role.next(dat.usuario.rol)
        this.userToken.next(dat.token)
      }
    }
    // isExpired ? this.logout() : this.loggedIn.next(true);    
  }

  private saveLocalStorage(user: UserResponse): void {
    //localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'No hay mas informacion.';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
