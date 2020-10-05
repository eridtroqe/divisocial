import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logout } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.state';
import { getIsAuth } from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Output() closeSidenav = new EventEmitter();
  isAuth: boolean;
  authSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  ngOnInit() {
    this.authSub = this.store.select(getIsAuth).subscribe(isAuth => this.isAuth = isAuth);
  }

  onLogout() {
    this.store.dispatch(logout());
    this.closeSidenav.emit();
  }

  onClose() {
    this.closeSidenav.emit();
  }
}
