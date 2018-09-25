import { Component, OnInit } from '@angular/core';
import { BaseAuthService } from 'src/app/services/base-auth.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offers;
  created;

  constructor(
    private baseAuthService: BaseAuthService,
  ) { }

  ngOnInit() {
  }

  getAllOffers(flag) {
    if (flag && flag.checked) {
      this.baseAuthService.widget.getAllOffers().then( data => {
        this.offers = data;
        console.log(data);
      });
    } else {
      this.offers = undefined;
    }
  }
  createOffer(flag) {
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
        compare:  new Map([
          ['age', '10']
        ]),
        rules: new Map([
          ['age', 0]
        ]),
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


    const offerJson = {
      id: 0,
      owner: '0x0',
      description: 'offer description',
      title: 'title',
      imageUrl: '',
      worth: '1',
      tags: {
        product: 'car',
        color: 'red',
        producer: 'mazda',
        model: 'RX9'
      },
      compare: {
        age: 10
      },
      rules: {
        age: 0
      },
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
    // this.baseAuthService.widget.saveOffer(offerJson).then( data => {
        this.created = data;
        console.log(data);
      });
    } else {
      this.created = undefined;
    }
  }
  updateOffer(flag) {
    if (flag && this.created) {
      this.created.title += (new Date()).toString();
      this.baseAuthService.widget.saveOffer(this.created).then( data => {
        this.created = data;
        console.log(data);
      });
    }
  }
  deleteOffer(flag) {
    if (flag && this.created) {
      this.baseAuthService.widget.deleteOffer(this.created.id).then( data => {
        this.created = undefined;
        console.log(data);
      });
    }
  }


}
