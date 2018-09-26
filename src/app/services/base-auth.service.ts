import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from './spinner.service';

import { DisplayOptions } from '../models/displayOptions';
import { Wallets, Wallet } from '../models/wallet';
import { Subject, BehaviorSubject } from 'rxjs';

declare var BASEAuthSDK: any;

@Injectable({
  providedIn: 'root'
})
export class BaseAuthService {
  data: Map<string, string> = new Map<string, string>(); // raw data, the response from server
  displayOptions: DisplayOptions;
  karma: Number;
  widget: any;
  BaseTools: any;
  authorized = false;
  private _publicKey = '';
  progress = new EventEmitter<number>();
  private _sig = '';
  wallets: Subject<Wallets> = new BehaviorSubject<Wallets>(null);
  private _wallets: Wallets;
  wealthValidatorPublicKey: string;
  wealth: Subject<Number> = new BehaviorSubject<Number>(322);
  wealthTimer: any;
  get publicKey(): string {
    return this._publicKey;
  }
  get allData() {
    return {
      displayOptions: this.displayOptions || new DisplayOptions(null),
      karma: this.karma,
      wallets: this.wallets
    };
  }
  constructor( private router: Router, private spinner: SpinnerService) {

    this.widget = new BASEAuthSDK.Widget({
      verificationMessage: 'unguessable random message',
      buttonStyle: {
        'display' : 'block',
        'width' : '60px',
        'padding' : 0,
        'border' : '0 none',
        'color' : '#fff',
        'font-family' : '"Ubuntu", sans-serif',
        'font-weight' : 500,
        'font-size' : '16px',
        'line-height' : '20px',
        'text-decoration' : 'none',
        'margin' : '0',
        '-webkit-appearance' : 'none',
        '-moz-appearance' : 'none',
        'appearance' : 'none',
        'cursor' : 'pointer',
        'text-align' : 'center',
        'outline' : 'none',
        'background': '#19191e'
      }
    });
    this.BaseTools = BASEAuthSDK.BaseTools;
    this.widget.insertLoginButton('#base-login');

    this.widget.listenForLogin( account => {

      // logged in
      this._publicKey = account.publicKey;
      this._sig = account.sig;
      this.authorized = true;

      // start load data
      setTimeout(() => {
        this
          .loadData()
          .then( result => {
            this.router.navigate(['cabinet/dashboard']);
          })
          .then(this.getWealth.bind(this))
          .then(wealth => {
            if (wealth) {
              // console.log('start Wealth update process');
              this.startProcessWealthUpdate(10000);
              this.widget.refreshWealthPtr();
            }
          });
      }, 100);


    });
    this.widget.listenForLogout(() => {
      this.signOut();
    });
  }

  delete() {
    console.log('the process of removing current user must be started here');
    this.signOut();
  }
  signOut() {
    this.authorized = false;
    this._publicKey = '';
    this._sig = '';
    this.router.navigate(['']);
    if (this.wealthTimer) {
      this.stopProcessWealthUpdate();
    }
  }
  loadData() {
    if (this.karma && this.displayOptions) {
      return Promise.resolve(this.allData);
    } else {
      return this._forcedDataLoading();
    }
  }
  _forcedDataLoading() {

    this.spinner.start();

    return this.widget
      .getData()
      .then(result => {
        if (result && result.size > 0) {
          this.data = result;
          const keys = Array.from(result.keys());
          const allExtractors = [
            this._extractDisplayOptions,
            this._extractKarma,
            this._extractWalets
          ];
          keys.forEach( key => {
            try {
              allExtractors.forEach( f => f.call(this, key, result.get(key)));
            } catch (err) {
              console.error(err);
            }
          });
        }
        this.spinner.stop();
        return this.allData;
      })
      .catch(err => {
        this.spinner.stop();
        return this.allData;
      });
  }
  _extractWalets(key, value) {
    if (key === Wallets.key) {
      this.wallets.next(new Wallets(value));
    }
  }
  _extractDisplayOptions(key, value) {
    if (key === DisplayOptions.key) {
      const parsedValue = JSON.parse(value);
      this.displayOptions.updateValue(parsedValue);
    }
  }
  _extractKarma(key, value) {
    if (key === 'karma') {
      if (!isNaN(value)) {
        this.karma = value;
      }
    }
  }


  async saveDisplayOptions() {
    this.spinner.start();
    const data = {};
    data[DisplayOptions.key] = this.displayOptions.value;
    const answer = await this.widget.updateData(data);

    this.spinner.stop();
  }
  async saveCarma(value: Number) {
    const key = 'karma';
    this.spinner.start();
    const data = {};
    this.karma = value;
    data[key] = this.karma.toString();
    const answer = await this.widget.updateData(data);

    this.spinner.stop();
  }

  async addWallet(wallet: Wallet) {
    if (!this._wallets) {
      this._wallets = new Wallets('');
    }
    this._wallets.addNewWalet(wallet);
    const msg = this._wallets.msg; // todo is msg a string o it can be array ?
    try {
      const data = await this.widget.createWalletsRecords(msg, this._publicKey);
      this._wallets.sig = data.sig;

      this.wallets.next(this._wallets);

    } catch (err) {
      console.error(err);
    }

  }
  async saveWallet() {
    const data = {};
    const key = Wallets.key;
    const value = this._wallets.value;

    data[key] = value;

    const answer = await this.widget.updateData(data);
    console.log(answer);
    return answer;
  }
  async getWealth() {
    try {
      console.log('the attempt to get wealth');
      const fromPk = this._publicKey;
      const toPk = this.wealthValidatorPublicKey;

      const wealthValidatorRecord = await this.widget.getRequests(fromPk, toPk);

      if (!wealthValidatorRecord || wealthValidatorRecord.length < 1) {
        return undefined;
      }
      const decryptedObj = await await this.widget.getAuthorizedData(toPk, wealthValidatorRecord[0].responseData);
      const rawMessage = decryptedObj.get(fromPk);
      const msg = JSON.parse(rawMessage);
      this.wealth.next(msg.wealth);
      return this.wealth;

    } catch (err) {
      console.error(err);
      return undefined;
    }
  }
  startProcessWealthUpdate(delay: number) {
    this.wealthTimer =  setInterval(this.getWealth.bind(this), delay);
  }
  stopProcessWealthUpdate() {
    clearTimeout(this.wealthTimer);
  }
}
