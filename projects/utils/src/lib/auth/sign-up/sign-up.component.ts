import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiError } from '../../shared/error/error.model';
import { NotificationService } from '../../shared/notification/notification.service';
import { AuthenticationService } from '../authentication.service';



@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form!: FormGroup;

  passwordVisible: boolean = false;

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
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  signUp(): void {
    this.error = null;
    this._auth.signUp(this.form.value).subscribe({
      next: user => {
        this._router.navigate(['auth', 'login']);
        this._notification.open('User created successfully');
      },
      error: error => {
        this.error = error;
      }
    });
  }

}
