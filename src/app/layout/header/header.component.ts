import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { logout } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.state';
import { getIsAuth } from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter();
  userIsAuthenticated: boolean;
  authSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  ngOnInit() {
    this.authSub = this.store.select(getIsAuth).subscribe(isAuth => this.userIsAuthenticated = isAuth);
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  openSideMenu() {
    this.sidenavToggle.emit();
  }
}
