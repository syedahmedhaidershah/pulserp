import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnyRes } from './any-res';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  getAllPackages() {
    return this.http.post<AnyRes>('/get/packages/all', {});
  }

  getType(type) {
    let ret = null;
    switch (type) {
      case 0:
        ret = 'Annual';
        break;
      case 1:
        ret = 'Quarterly';
        break;
      default:
        ret = 'Annual';
        break;
    }
    return ret;
  }

  registerUser(data) {
    return this.http.post<AnyRes>('/register/user', data);
  }
}
