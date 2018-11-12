import { Component, OnInit } from '@angular/core';
import { ExternalProvidersService } from './external-providers.service';
import { GoogleCredential } from 'src/app/models/googleCredential';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-external-providers',
  templateUrl: './external-providers.component.html',
  styleUrls: ['./external-providers.component.css']
})
export class ExternalProvidersComponent implements OnInit {
  token: GoogleCredential;
  saveToBaseState;

  constructor(
    private externalProviderService: ExternalProvidersService
  ) {
    this.externalProviderService.token.subscribe( one =>
        this.token = one
    );
    this.externalProviderService.state.pipe(filter(e => !!e)).subscribe( response => {
      const result = {};
      response.forEach( (value, key) =>
        result[key] = value
      );
      this.saveToBaseState = result;
    });

  }

  ngOnInit() {
  }
  startGoogleAuth() {
    this.externalProviderService.startGoogleAuth();
  }
  provideAccess() {
    this.externalProviderService.provideAccess();
  }
  getAssessment() {
    this.externalProviderService.getAssessment();
  }

}
