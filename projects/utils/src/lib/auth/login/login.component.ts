import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiError } from '../../shared/error/error.model';
import { AuthenticationService } from '../authentication.service';
import { NotificationService } from '../../shared/notification/notification.service';



@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  error: ApiError | null = null;

  get formDisabled(): boolean {
    return this.form.invalid;
  }

  constructor(
    private _router: Router,
    private _notification: NotificationService,
    private _auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void {
    this.error = null;
    const { username, password } = this.form.value;
    this._auth.login(username, password).subscribe({
      next: response => {
        this._router.navigate(['polls', 'list']);
        this._notification.open('Logged in successfully');
      },
      error: error => {
        this.error = error;
      }
    });
  }

}
