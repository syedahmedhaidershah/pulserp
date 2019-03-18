import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnyRes } from './any-res';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  addItemToInventory(data) {
    return this.http.post<AnyRes>('/add/inventory/item', data);
  }

  getAllItems() {
    return this.http.post<AnyRes>('/get/inventory/item/all', {});
  }

  deleteItem(data) {
    return this.http.post<AnyRes>('/delete/inventory/item', data);
  }
}
