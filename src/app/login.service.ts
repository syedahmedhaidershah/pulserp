import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnyRes } from './any-res';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(creds) {
    return this.http.post<AnyRes>('/login', creds);
  }
}
