import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-section',
  templateUrl: './inventory-section.component.html',
  styleUrls: ['./inventory-section.component.css']
})
export class InventorySectionComponent implements OnInit {

  inventoryStats = [
    {
      icon: 'all_inbox',
      label: 'Crates',
      remaining: 450
    },
    {
      icon: 'inbox',
      label: 'Empty',
      remaining: 50
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
