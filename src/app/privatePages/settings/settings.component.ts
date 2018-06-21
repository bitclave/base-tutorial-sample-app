import { Component, OnInit } from '@angular/core';

import { DisplayOptions } from './../../models/displayOptions';

import { BaseAuthService } from '../../services/base-auth.service';
import { NavigationStateService } from './../../services/navigation-state.service';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    displayOptions = new DisplayOptions({});

    karma: Number = 5.0;
    constructor(
      private baseAuthService: BaseAuthService,
      private navigationStateService: NavigationStateService) {

    }
    ngOnInit() {
      this.navigationStateService.changeState('Settings', 'settings');
      this.baseAuthService.loadData().then( data => {
        this.displayOptions = data.displayOptions;
        this.karma = data.karma;
      });

    }
    saveCarma() {
      this.baseAuthService.saveCarma(this.karma);
    }
    saveDisplayOptions() {
      this.baseAuthService.saveDisplayOptions();
    }

}
