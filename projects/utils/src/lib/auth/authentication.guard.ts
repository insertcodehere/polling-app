import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Observable } from "rxjs";

import { AuthenticationService } from "./authentication.service";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private _router: Router, private _auth: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this._auth.isAuthenticated()) {
      return true;
    }

    return this._router.createUrlTree(['auth', 'login']);
  }

}
