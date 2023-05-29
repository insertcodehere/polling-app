import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { AuthenticationService } from '../auth/authentication.service';
import { User } from '../auth/user/user.model';



@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private _destroy = new Subject<void>();

  @Input()
  authenticatedUser: User | null = null

  get isAuthenticated(): boolean {
    return Boolean(this.authenticatedUser);
  }

  constructor(private _router: Router, private _auth: AuthenticationService) { }

  ngOnInit(): void {
    this._auth.authenticated
      .pipe(
        takeUntil(this._destroy)
      )
      .subscribe(_ => {
        this.authenticatedUser = this._auth.authenticatedUser;
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
  }

  authRequest(): void {
    const isAuthenticated = this._auth.isAuthenticated();
    if (isAuthenticated) {
      this._auth.logout();
    }

    this._router.navigate(['auth', 'login']);
  }

}
