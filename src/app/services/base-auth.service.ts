import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from './spinner.service';

import { DisplayOptions } from '../models/displayOptions';

declare var BASEAuthSDK: any;

@Injectable({
  providedIn: 'root'
})
export class BaseAuthService {
  data: Map<string, string> = new Map<string, string>(); // raw data, the response from server
  displayOptions: DisplayOptions;
  karma: Number;
  widget: any;
  authorized = false;
  private _publicKey = '';
  progress = new EventEmitter<number>();
  private _sig = '';
  get publicKey(): string {
    return this._publicKey;
  }
  get allData() {
    return {
      displayOptions: this.displayOptions,
      karma: this.karma
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
        if (result && result.size > 0 ) {
          this.data = result;
        }
        this._extractDisplayOptions(result);
        this._extractKarma(result);

        this.spinner.stop();
        return this.allData;
      })
      .catch(err => {
        this.spinner.stop();
        return this.allData;
      });
  }
  _extractDisplayOptions(response) {
    if (!this.displayOptions) {
      this.displayOptions = new DisplayOptions({});
    }
    if (response && response.size > 0) {
      const keys = Array.from(response.keys());

      keys.forEach( key => {
        if (key === DisplayOptions.key) {
          try {
            const value = JSON.parse(response.get(key));
            this.displayOptions.updateValue(value);
          } catch (err) {
            console.error(err);
          }
        }
      });
    }

  }
  _extractKarma(response) {
    if (response && response.size > 0) {
      const keys = Array.from(response.keys());

      keys.forEach( key => {
        if (key === 'karma') {
          const value = response.get(key);
          if (!isNaN(value)) {
            this.karma = value;
          }
        }
      });

    }
    if (!this.karma) {
      this.karma = 5.5;
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
}
