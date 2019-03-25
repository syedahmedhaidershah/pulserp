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

  getAllConsumerItems() {
    return this.http.post<AnyRes>('/get/inventory/items/consumer', {});
  }

  getAllRentalItems() {
    return this.http.post<AnyRes>('/get/inventory/items/rental', {});
  }

  getItem(data) {
    return this.http.post<AnyRes>('/get/inventory/item', data);
  }

  deleteItem(data) {
    return this.http.post<AnyRes>('/delete/inventory/item', data);
  }

  editInvItem(data) {
    return this.http.post<AnyRes>('/update/inventory/item', data);
  }

  updateItemQuantity(data) {
    return this.http.post<AnyRes>('/update/inventory/item/quantity', data);
  }
}
