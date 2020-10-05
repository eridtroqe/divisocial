import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { isLoadingAuth } from 'src/app/store/reducers/auth.reducer';
import { User } from '../../../model/auth.interface';
import { loginRequest } from '../../../store/actions/auth.actions';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  loadingSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

  ngOnInit() {
    this.loadingSub = this.store
      .select(isLoadingAuth)
      .subscribe(loading => this.isLoading = loading);
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const userForm: User = {
      email: form.value.email,
      password: form.value.password
    };
    this.store.dispatch(loginRequest({ payload: userForm }));
  }

}
