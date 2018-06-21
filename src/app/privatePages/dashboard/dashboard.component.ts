import { Component, OnInit } from '@angular/core';
import { NavigationStateService } from './../../services/navigation-state.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { BaseAuthService } from './../../services/base-auth.service';
import { DisplayOptions } from './../../models/displayOptions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  karma: Number;
  displayOptions: DisplayOptions;

  constructor(
    private baseAuthService: BaseAuthService,
    private navigationStateService: NavigationStateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
      this.matIconRegistry.addSvgIcon(
        `verified`, this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/Verified user.svg`)
      );
    }

  ngOnInit() {
    this.navigationStateService.changeState('Dashboard', 'dashboard');

    this.displayOptions =  this.baseAuthService.allData.displayOptions;
    this.karma = this.baseAuthService.allData.karma;
  }

}
