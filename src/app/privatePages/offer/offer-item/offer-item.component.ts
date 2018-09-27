import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css']
})
export class OfferItemComponent implements OnInit {

  @Input() offer;
  @Input() offerSearch;
  @Output() acceptOfferByPriceId = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  getKeys(map) {
    return Array.from(map.keys());
  }
  acceptOfferWithPrice(price) {
    this.acceptOfferByPriceId.emit({ price, offerSearch: this.offerSearch });
  }

}
