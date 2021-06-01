import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject: BehaviorSubject<Usuario>;
  public user: Observable<Usuario>;

  constructor(private router: Router, private http: HttpClient) {
    const usuario = localStorage.getItem('user') || '{}';
    this.userSubject = new BehaviorSubject<Usuario>(JSON.parse(usuario));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Usuario {
    return this.userSubject.value;
  }

  login(usuario: string, senha: string) {
    return this.http.post<any>(`${environment.loginUrl}/login`, { usuario, senha })
      .pipe(map(user => {
        user.authdata = window.btoa(usuario + ':' + senha);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null as any);
    this.router.navigate(['']);
  }

}
