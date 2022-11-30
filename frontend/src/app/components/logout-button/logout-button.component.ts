import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Auth2Service } from 'app/auth2.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styles: [],
})
export class LogoutButtonComponent implements OnInit {
  constructor(
    public auth2: Auth2Service,
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.auth2.login(false);
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}