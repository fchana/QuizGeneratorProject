import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Auth2Service } from 'app/auth2.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styles: [],
})
export class LoginButtonComponent implements OnInit {
  constructor(public auth: AuthService
    // , public auth2: Auth2Service
    ) {}

  ngOnInit(): void {}

  loginWithRedirect(): void {
    // this.auth2.login();
    this.auth.loginWithRedirect({
      appState: { target: '/props' }
    });
  }
}