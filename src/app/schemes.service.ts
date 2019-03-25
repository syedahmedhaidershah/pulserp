import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnyRes } from './any-res';

@Injectable({
  providedIn: 'root'
})
export class SchemesService {

  constructor(
    private http: HttpClient
  ) { }

  addScheme(data) {
    return this.http.post<AnyRes>('/add/scheme/', data);
  }

  getAllSchemes() {
    return this.http.post<AnyRes>('/get/schemes/all', {});
  }

  deleteScheme(data) {
    return this.http.post<AnyRes>('/delete/schemes/', data);
  }
}
