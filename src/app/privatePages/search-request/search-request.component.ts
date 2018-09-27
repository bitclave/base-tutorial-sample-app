import { Component, OnInit } from '@angular/core';
import { BaseAuthService } from '../../services/base-auth.service';
import { AddWalletService } from '../../services/add-wallet.service';
import { pipe } from 'rxjs';
import { Wallets, Wallet } from '../../models/wallet';

@Component({
  selector: 'app-search-request',
  templateUrl: './search-request.component.html',
  styleUrls: ['./search-request.component.css']
})
export class SearchRequestComponent implements OnInit {

  ethWallet: Wallet;
  matchedOffers;

  searchRequests;
  createdSearchRequest;

  constructor(
    private baseAuthService: BaseAuthService,
    private addWalletService: AddWalletService,
  ) { }

  ngOnInit() {
    this.baseAuthService.wallets.subscribe( (wallets: Wallets) => {
      if (wallets) {
        this.ethWallet = wallets.ones[0]; // first wallet
      }
    });
  }

  getAllRequests(flag) {
    if (flag && flag.checked) {
      this.baseAuthService.widget.getAllRequests().then( data => {
        this.searchRequests = data;
        console.log(data);
      });
    } else {
      this.searchRequests = undefined;
    }
  }
  createRequest(flag) {
    if (flag && flag.checked) {
      const request = {
        id: 0,
        owner: '0x0',
        tags: new Map([
          ['product', 'car'],
          ['color', 'red'],
          ['producer', 'mazda'],
          ['models', 'RX8']
        ])
      };
      this.baseAuthService.widget.createRequest(request).then( data => {
        this.createdSearchRequest = data;
        console.log(data);
      });
    } else {
      this.createdSearchRequest = undefined;
    }
  }
  updateRequest(flag) {
    const now = (new Date()).toISOString();
    this.createdSearchRequest.tags.set('time', now);
    this.baseAuthService.widget.createRequest(this.createdSearchRequest).then( data => {
      this.createdSearchRequest = data;
      console.log(data);
    });

  }
  deleteRequest(flag) {
    if (flag && this.createdSearchRequest) {
      this.baseAuthService.widget.deleteRequest(this.createdSearchRequest.id).then( data => {
        this.createdSearchRequest = undefined;
        console.log(data);
      });
    }
  }
  addWallets() {
    this
      .addWalletService
      .getEtheriumSignature()
      .then( data =>
        this.baseAuthService.addWallet(data)
      )
      .then( () =>
        this.baseAuthService.saveWallet()
      )
      .catch(err =>
        console.error(err)
      );
  }

  getSearchResultByRequestId(flag) {
    if (flag && flag.checked && this.createdSearchRequest) {
      this.baseAuthService
        .widget
        .getSearchResultByRequestId(this.createdSearchRequest.id)
        .then( searchResults =>
          this.matchedOffers = searchResults
        );
    }
  }

  grantAccessForOffer(data) {
    const pk = this.baseAuthService.publicKey;
    const price = data.price;
    const offerSearch = data.offerSearch;

    const fields = new Map<string, AccessRight>();
    if (price.rules && price.rules.length > 0) {
        price.rules.forEach(element => {
            fields.set(element.rulesKey, AccessRight.R);
        });
    }

    this.baseAuthService
      .widget
      .grantAccessForOffer(offerSearch.id, pk, fields, price.id)
      .then();
  }
}

export enum AccessRight {
  R = 0,
  RW = 1
}
