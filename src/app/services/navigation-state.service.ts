import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationStateService {

  title: BehaviorSubject<string> = new BehaviorSubject<string>('Vault Dashboard');
  menuItem: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  changeState(title: string, menuItem: string) {
    this.title.next(title);
    this.menuItem.next(menuItem);
  }
}
