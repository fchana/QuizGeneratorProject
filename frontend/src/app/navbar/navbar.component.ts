import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService  } from '@auth0/auth0-angular'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public  auth: AuthService) { }

  items!: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
          label: 'Online Quiz Generator',
          items: [{
                  label: 'Proposition list', 
                  icon: 'pi pi-fw pi-plus',
              },
              {label: 'Open'},
              {label: 'Quit'}
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      }
  ];
  }

}