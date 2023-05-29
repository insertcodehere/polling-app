import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";

import { User } from "../user/user.model";



const AUTH_STORAGE_KEY = 'AuthenticatedUser';

type UserSignUpDTO = Omit<User, 'id'> & {
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _apiBaseEndpoint: string = `${environment.pollApi}/auth`;

  private _authenticatedUser: User | null = null;

  get authenticatedUser(): User | null {
    return this._authenticatedUser;
  }

  private _authenticated = new BehaviorSubject<boolean>(false);

  authenticated = this._authenticated.asObservable();

  constructor(private _http: HttpClient) {
    const storageItem = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storageItem) {
      const parsed = JSON.parse(storageItem);
      this._authenticatedUser = parsed;
      this._authenticated.next(true);
    }
  }

  isAuthenticated(): boolean {
    return this._authenticatedUser !== null;
  }

  login(username: string, password: string): Observable<User> {
    const payload = {
      username,
      password
    };
    return this._http.post<User>(`${this._apiBaseEndpoint}/login`, payload).pipe(
      tap(user => {
        this._authenticatedUser = user;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        this._authenticated.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this._authenticatedUser = null;
    this._authenticated.next(false);

    this._http.post<User>(`${this._apiBaseEndpoint}/logout`, {}).subscribe();
  }

  signUp(user: UserSignUpDTO): Observable<User> {
    return this._http.post<User>(`${this._apiBaseEndpoint}/signup`, user);
  }

}
