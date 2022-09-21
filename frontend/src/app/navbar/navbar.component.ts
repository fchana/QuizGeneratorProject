import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '@auth0/auth0-angular'
import { Proposition } from 'app/Model/proposition';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/Model/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  profileJson!: User;
  proposition!: Proposition[];

  constructor(private http: HttpClient, public auth: AuthService) { }

  items!: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Online Quiz Generator',
        items: [{
          label: 'Proposition list',
          routerLink: '/props',
        },
        {
          label: 'Proposition',
          items: [],
        }, {
          label: 'Permission',
          routerLink: '/permission'
        }
        ]
      },
      // {
      //     label: 'Edit',
      //     icon: 'pi pi-fw pi-pencil',
      //     items: [
      //         {label: 'Delete', icon: 'pi pi-fw pi-trash'},
      //         {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
      //     ]
      // }
    ];
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
          this.profileJson = response;
          this.proposition = this.profileJson.proposition;

          this.proposition.forEach((props, index) => {
            if (this.items[0]?.items !== undefined) {
              if (this.items[0]?.items[1].items !== undefined) {
                this.items[0]?.items[1].items.push({
                  label: props.prop_name.toString(),
                  routerLink: '/props/' + index + '/quizs',
                })
              }
            }
          });


        })
      ),
    );
  }

}
