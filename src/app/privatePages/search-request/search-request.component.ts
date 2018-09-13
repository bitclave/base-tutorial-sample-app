import { Component, OnInit } from '@angular/core';
import { BaseAuthService } from '../../services/base-auth.service';

@Component({
  selector: 'app-search-request',
  templateUrl: './search-request.component.html',
  styleUrls: ['./search-request.component.css']
})
export class SearchRequestComponent implements OnInit {

  offers;
  created;

  constructor(
    private baseAuthService: BaseAuthService
  ) { }

  ngOnInit() {
  }

  getAllRequests(flag) {
    if (flag && flag.checked) {
      this.baseAuthService.widget.getAllOffers().then( data => {
        this.offers = data;
        console.log(data);
      });
    } else {
      this.offers = undefined;
    }
  }
  createRequest(flag) {
    if (flag && flag.checked) {
      const offer = {
        id: 0,
        owner: '0x0',
        description: 'offer description',
        title: 'title',
        imageUrl: '',
        worth: '1',
        tags: new Map([
          ['product', 'car'],
          ['color', 'red'],
          ['producer', 'mazda'],
          ['models', 'RX8']
        ]),
        compare: new Map(),
        rules: new Map(),
        offerPrices: [
          {
            id: 0,
            description: 'price 1 description',
            worth: '1.5',
            rules: [
              {
                id: 0,
                rulesKey: 'age',
                value: '10',
                rule: 0
              }
            ]
          }
        ]
      };
      this.baseAuthService.widget.saveOffer(offer).then( data => {
        this.created = data;
        console.log(data);
      });
    } else {
      this.created = undefined;
    }
  }
  updateRequest() {
    console.log('test update');
  }
  deleteRequest() {
      console.log('test delete');
  }


}
