import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnyRes } from './any-res';

@Injectable({
  providedIn: 'root'
})
export class SalesmanService {

  constructor(private http: HttpClient) { }

  addSalesman(data) {
    return this.http.post<AnyRes>('/add/salesman', data);
  }

  getAllSalesmen() {
    return this.http.post<AnyRes>('/get/salesman/all', {});
  }
}
