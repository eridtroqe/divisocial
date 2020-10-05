import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { isLoadingAuth } from 'src/app/store/reducers/auth.reducer';
import { User } from '../../../model/auth.interface';
import { createUserRequest } from '../../../store/actions/auth.actions';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  isLoading = false;
  loadingSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.loadingSub = this.store
      .select(isLoadingAuth)
      .subscribe(loading => this.isLoading = loading);
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const userForm: User = {
      email: form.value.email,
      password: form.value.password
    };
    this.store.dispatch(createUserRequest({ payload: userForm }));
  }

}
