import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-section',
  templateUrl: './inventory-section.component.html',
  styleUrls: ['./inventory-section.component.css']
})
export class InventorySectionComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router) { }


  ngOnInit() {
  }

  goToAddInventoryItem() {
    this.router.navigate(['inventory']);
  }

}
