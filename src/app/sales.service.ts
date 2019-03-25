import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnyRes } from './any-res';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  makeASale(arr) {
    return this.http.post<AnyRes>('/add/sales/consumer', {
      data: arr
    });
  }

  getAllSales() {
    return this.http.post<AnyRes>('/get/sales/all', {});
  }

  retreiveInProgressSales() {
    return this.http.post<AnyRes>('/get/sales/inprogress', {});
  }

  retreiveInProgressComplete() {
    return this.http.post<AnyRes>('/get/sales/inprogress/all', {});
  }

  updateBalance(data) {
    return this.http.post<AnyRes>('/inprogress/payout', data);
  }
}
