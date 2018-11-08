import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { BaseAuthService } from 'src/app/services/base-auth.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { GoogleCredential } from 'src/app/models/googleCredential';

@Injectable({
  providedIn: 'root'
})
export class ExternalProvidersService {
    token: Subject<GoogleCredential> = new BehaviorSubject<GoogleCredential>(null);
    state: Subject<any> = new BehaviorSubject<any>(null);

    constructor(
        private http: HttpClient,
        private baseAuth: BaseAuthService
    ) { }

    startGoogleAuth() {
      const url = environment.API.oauth2 + '/google/getUrl';
      const data = {
        pk: this.baseAuth.publicKey
      };
      this.http.post(url, data).subscribe( (response: any) => {
        const googleUrl = response.url;
        window.open(googleUrl);
        this.insistentlyRetrievToken();
      });
    }
    provideAccess() {

    }
    async sendTokenToBASE(token: GoogleCredential) {
      const response = await this.baseAuth.saveKeyValue(token);
      this.state.next(response);
    }
    private async insistentlyRetrievToken() {
      let token: GoogleCredential;
      do {
        console.log('attempt to get token');
        token = await this.getToken();
        if (token) {
          console.log('emit the token', token);

          this.token.next(token);

          await this.sendTokenToBASE(token);
        }
        await this.pause(15);
      } while (!token);
      console.log('the token was retrieved !!!');
    }
    private pause(sec): Promise<any> {
      return new Promise((resolve, reject) => {
        setTimeout( _ => resolve(), sec * 1000);
      });
    }
    private async getToken(): Promise<GoogleCredential> {
      const url = environment.API.oauth2 + '/google/getToken';
      const data = {
        pk: this.baseAuth.publicKey
      };
      return this.http
        .post<GoogleCredential>(url, data)
        .toPromise()
        .then(token =>
          token && new GoogleCredential(token)
        );
    }

}
