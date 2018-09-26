import { Injectable } from '@angular/core';
import { Wallets, Wallet } from '../models/wallet';
import { BaseAuthService } from '../services/base-auth.service';
import Web3 = require('web3');

declare const window;
const Buffer = window.buffer.Buffer;


let web3 = new Web3();

if (typeof web3 !== 'undefined' && window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:4200'));
}
// const web3 = new Web3(window.web3.currentProvider);

@Injectable({
  providedIn: 'root'
})
export class AddWalletService {
  constructor(
    private baseAuthService: BaseAuthService,
  ) { }
  private async _getAccount() {
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res[0].toString());
        }
      });
    });
  }
  private _signMessage(message, addr) {
    return new Promise( (resolve, reject) => {
      const msg = '0x' + (new Buffer(message, 'utf8')).toString('hex');
      const params = [msg, addr];
      const method = 'personal_sign';
      const options = {method, params, addr};


      (web3 as any).currentProvider.sendAsync(options, function(err, result) {
          if (err) {
            reject(err);
          } else {
            const sig = result.result;
            const signedMessage = {
                address: addr,
                msg: message,
                sig: sig,
                version: '3',
                signer: 'web3'
            };
            resolve(signedMessage);
          }
      });
    });
  }

  async getEtheriumSignature() {

    let signingAddr = '';
    const noWeb3Msg = 'WEB3 is not detected';
    const noSigningAddrMsg = 'Can not detect ETH address from WEB3 provider.\nPlease login';
    const baseID = this.baseAuthService.publicKey;

    if (typeof web3 === 'undefined') {
      alert(noWeb3Msg);
      return;
    }

    signingAddr = (await this._getAccount() as any).toString();

    if (!signingAddr) {
        alert(noSigningAddrMsg);
        return;
    }

    signingAddr = signingAddr.toLowerCase(); // always use lower case for addresses

    const thisMessage = JSON.stringify({
      baseID,
      ethAddr: signingAddr
    });

    const message: any = await this._signMessage(thisMessage, signingAddr);
    const wallet = new Wallet({ baseID, ethAddr: signingAddr, sig: message.sig});
    return wallet;
  }
}
