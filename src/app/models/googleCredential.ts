import { ToBASE } from './iToBASE';

export class GoogleCredential implements ToBASE {
  access_token: string;
  expiry_date: number;
  refresh_token: string;
  scope: string;
  token_type: string;

  constructor(obj) {
    this.access_token = obj && obj.access_token;
    this.expiry_date = obj && obj.expiry_date;
    this.refresh_token = obj && obj.refresh_token;
    this.scope = obj && obj.scope;
    this.token_type = obj && obj.token_type;
  }
  toBASE(): {[key: string]: string} {
    return {
      csr_partner_gsuite: JSON.stringify({ api_key: this.access_token })
    };
  }
}
