import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './endpoint/auth.service';
import { authFalse, authTrue } from './store/actions/auth.actions';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private store: Store<AppState>) { }

  ngOnInit() {
    const authToken = this.authService.getToken();
    if (!authToken) {
      this.store.dispatch(authFalse());
    } else {
      this.store.dispatch(authTrue());
    }

  }
}
