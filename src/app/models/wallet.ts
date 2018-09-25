export class Wallet {

  baseID: string;
  ethAddress: string;
  ethSignature: string;

  constructor(walletData) {
    if (walletData && walletData.data) {
      // reading wallet data from BASE
      const parsed = JSON.parse(walletData.data);
      this.baseID =  parsed.baseID || '';
      this.ethAddress = parsed.ethAddr || '';
      this.ethSignature = walletData.sig || '';
    } else if (walletData && walletData.baseID && walletData.ethAddr && walletData.sig) {
      // wallet data from etherium, first time creating wallet
      this.baseID =  walletData.baseID || '';
      this.ethAddress = walletData.ethAddr || '';
      this.ethSignature = walletData.sig || '';
    }
  }
  get value() {
      const newAddr = {
          'baseID': this.baseID,
          'ethAddr': this.ethAddress
      };
      const newAddrRecord = {
          'data': JSON.stringify(newAddr),
          'sig': this.ethSignature
      };
      return newAddrRecord;
  }
}

export class Wallets {
  ones: Wallet[];
  sig = '';
  constructor( baseRecordValue: string ) {
      if (baseRecordValue) {
        const parsedValue = JSON.parse(baseRecordValue);
        if (parsedValue && parsedValue.data && parsedValue.data.length > 0) {
          this.ones = [];
          parsedValue.data.forEach( walletData => {
            const wallet = new Wallet(walletData);
            this.ones.push(wallet);
          });
          this.sig = parsedValue.sig || '';
        }
      } else {
        this.ones = [];
      }

  }
  static get key(): string {
      return 'eth_wallets';
  }
  get value(): string {
    const data = this.ones.map(el => el.value);
    return JSON.stringify({ data, sig: this.sig });
  }
  get msg() {
    return this.ones.map(el => el.value);
  }
  addNewWalet(wallet: Wallet) {
    this.ones.push(wallet);
  }

}
