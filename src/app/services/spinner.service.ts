import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private counter = 0;
  public waiting: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
  public start() {
    this.counter++;
    this.waiting.next(true);
  }
  public stop() {
    if (this.counter === 1) {
      this.counter = 0;
      this.waiting.next(false);
    } else if (this.counter > 1) {
      this.counter--;
    }
  }
}
