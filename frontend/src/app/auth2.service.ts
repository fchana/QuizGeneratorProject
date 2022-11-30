import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular'
import { HttpClient } from '@angular/common/http';
import { User } from 'app/shared/Model/user';
import { NavbarComponent } from './navbar/navbar.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth2Service {
  public isLoggedIn: boolean;
  public redirectUrl: string;

  constructor(public auth: AuthService, private http: HttpClient) { }

  login(boolean: boolean): Observable<boolean> {
    this.isLoggedIn = boolean;
    return of(true);  
  }

  signin(boolean: boolean): void {
    this.isLoggedIn = boolean;
    console.log("login  : ", this.getIsLoggedIn())
  }

  getIsLoggedIn(){
    return this.isLoggedIn;
  }

}

