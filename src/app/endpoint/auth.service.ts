import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../model/auth.interface';

const BACKEND_URL = environment.apiUrl + '/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }


  getToken() {
    return localStorage.getItem('token');
  }

  createUser(email: string, password: string) {
    const authData: User = { email, password };
    return this.http.post(BACKEND_URL + '/signup', authData);
  }

  login(email: string, password: string) {
    const authData: User = { email, password };
    return this.http
      .post<{ token: string; expiresIn: number; email: string }>(
        BACKEND_URL + '/login',
        authData
      );
  }

}
