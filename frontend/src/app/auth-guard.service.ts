import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { Auth2Service } from './auth2.service';
import { AuthService } from '@auth0/auth0-angular'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private auth2Service: Auth2Service,
    private router: Router,
    public auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    console.log("canActive Run : ", this.auth2Service.getIsLoggedIn())
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('canActivateChild run');
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    this.auth.getAccessTokenSilently().subscribe(
      (val) => {
        if (val){
          console.log("logged in.")
          this.auth2Service.login();
          this.auth2Service.getIsLoggedIn();
        }
      }
    )
    if (this.auth2Service.getIsLoggedIn()) {
      return true;
    }

    this.auth2Service.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }
}
