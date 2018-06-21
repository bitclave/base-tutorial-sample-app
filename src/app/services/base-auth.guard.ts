import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseAuthService } from './base-auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseAuthGuard implements CanActivate {
  constructor (private baseAuthService: BaseAuthService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.baseAuthService.authorized) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
