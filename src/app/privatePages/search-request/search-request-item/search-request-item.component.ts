import { Component, OnInit, Input } from '@angular/core';
import { BaseAuthService } from '../../../services/base-auth.service';

@Component({
  selector: 'app-search-request-item',
  templateUrl: './search-request-item.component.html',
  styleUrls: ['./search-request-item.component.css']
})
export class SearchRequestItemComponent implements OnInit {
  matchedOffers;
  @Input() request;
  constructor(
    private baseAuthService: BaseAuthService
  ) { }

  ngOnInit() {
  }

  getKeys(map) {
    return Array.from(map.keys());
  }

  findOffer(id: string) {
    this.baseAuthService
      .widget
      .getSearchResultByRequestId(id)
      .then( searchResults =>
        this.matchedOffers = searchResults
      ).catch(err =>
        console.log(err)
      );
  }
  grantAccessForOffer(data) {
    const pk = this.baseAuthService.publicKey;
    const price = data.price;
    const offerSearch = data.offerSearch;
    const offer = data.offer;

    const fields = new Map<string, AccessRight>();
    if (price.rules && price.rules.length > 0) {
        price.rules.forEach(element => {
            fields.set(element.rulesKey, AccessRight.R);
        });
    }
    console.log('grantAccessForOffer: data=', data)

    this.baseAuthService
      .widget
      .grantAccessForOffer(offerSearch.id, offer.owner, fields, price.id)
      .catch(err =>
        console.log(err)
      );
  }

}

export enum AccessRight {
  R = 0,
  RW = 1
}
