import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  captialize(str) {
    return str.substring(0, 1).toUpperCase().concat(str.substring(1));
  }

  reverseStr(str) {
    return str.split('').reverse().join('');
  }
}
