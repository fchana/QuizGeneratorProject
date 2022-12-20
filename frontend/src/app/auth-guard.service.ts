import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  Route
} from '@angular/router';
import { Auth2Service } from './auth2.service';
import { AuthService } from '@auth0/auth0-angular'
import { Observable } from 'rxjs';
import { User } from './shared/Model/user';
import { HttpClient } from '@angular/common/http';
import { Footer } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  profileJson: any;
  status: Number;

  constructor(
    private auth2Service: Auth2Service,
    private router: Router,
    public auth: AuthService,
    private http: HttpClient) {
    this.status = 1;
  }

  canActivate = async () => {
    if (this.auth.isAuthenticated$) {
      let foo = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(this.auth.idTokenClaims$.subscribe(
              (profile) => (
                this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
                  if (response.account_type == true) {
                    this.status = 1;
                    console.log("account true")
                  }
                  else
                    this.status = 0;

                })
              ),
            ));
          }, 2000);
        })
      }

      let bar = async () => {
        let y = await foo();
        console.log(y);
        return this.status;
      }
      let x = await bar();

      if(this.status == 1){
        console.log("return")
        return x
      }
      else{
        console.log("return")
        return x
      }
    }
    return false
  }

  // async canActivate(
  //   state: RouterStateSnapshot,
  //   route: ActivatedRouteSnapshot
  // ): Promise<Observable<boolean> | Promise<boolean> | boolean> {
  //   if (this.auth.isAuthenticated$) {
  //     let x = await foo();
  //   }
  //   if (this.status == 1)
  //     return true;
  //   else {
  //     this.router.navigate(["/login"]);
  //     return false
  //   }
  // }

  // let url: string = state.url;
  // return this.checkLogin(url);


  checkLogin(url: string): boolean {
    this.auth.getAccessTokenSilently().subscribe(
      (val) => {
        if (val) {
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
