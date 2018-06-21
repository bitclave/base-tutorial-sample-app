import { Component, OnInit } from '@angular/core';
import { BaseAuthService } from './../../services/base-auth.service';
import { NavigationStateService } from './../../services/navigation-state.service';
import { BehaviorSubject } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {
  isCompactMenu = false;
  key = '';
  title = 'Vault Dashboard';
  menuItem: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private baseAuthService: BaseAuthService,
    private navigationStateService: NavigationStateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon(
      `dashboard`, this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/Dashboard.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `wallet`, this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/Wallet.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `history`, this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/History.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `permission`, this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/Permission.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `services`, this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/Services.svg`)
    );
    this.navigationStateService.title.subscribe( title =>
      this.title = title
    );
    this.navigationStateService.menuItem.subscribe( item =>
      this.menuItem.next(item)
    );
    // this.menuItem = this.navigationStateService.menuItem;
  }

  ngOnInit() {
    this.key = this.baseAuthService.publicKey || '02a82cab86dd9147f9cb2b50a8ccf43d99ee7f6ed4934eae7d2a13a92b5fd061aa';
  }
  transformSideNav() {
    this.isCompactMenu = ! this.isCompactMenu;
  }
  delete() {
    this.baseAuthService.delete();
  }
  signOut() {
    this.baseAuthService.signOut();
  }

  copyPublicKey() {
    this.copyMessage(this.key);
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
