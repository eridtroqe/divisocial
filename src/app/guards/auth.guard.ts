import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../endpoint/auth.service';
import { getIsAuth } from '../store/reducers/auth.reducer';


@Injectable()
export class AuthGuard implements CanActivate {
  isAuthStore: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getToken();
    this.store.select(getIsAuth).subscribe(val => this.isAuthStore = val);
    if (!isAuth) {
      this.router.navigate(['auth/login']);
      return false;
    }
    if (isAuth && this.isAuthStore === true) {
      return true;
    }
  }
}
