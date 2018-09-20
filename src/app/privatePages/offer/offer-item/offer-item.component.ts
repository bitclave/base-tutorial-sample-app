import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css']
})
export class OfferItemComponent implements OnInit {

  @Input() offer;
  constructor() { }

  ngOnInit() {
  }

  getKeys(map) {
    return Array.from(map.keys());
  }

}
