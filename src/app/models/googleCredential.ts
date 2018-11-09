import { ToBASE } from './iToBASE';
import { environment } from './../../environments/environment';

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
  toBASE(key?: string): {[key: string]: string} {
    const keyToBase = key || environment.googleTokenKey;
    return {
      [ keyToBase ]: JSON.stringify({ api_key: this.access_token })
    };
  }
}
