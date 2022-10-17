import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '@auth0/auth0-angular'
import { Proposition } from 'app/shared/Model/proposition';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/shared/Model/user';


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
  items2!: MenuItem[];
  items3!: MenuItem[];

  ngOnInit(): void {
    console.log("profileJson : ", this.profileJson == undefined);
    if (this.profileJson == undefined) {
      this.items = [
        {
          label: 'Online Quiz Generator',
          items: [{
            label: 'Online Quiz Generator',
            routerLink: '/props',
          }
          ]
        },
      ];
    }
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
          this.profileJson = response;
          this.proposition = this.profileJson.proposition;

          if (response.account_type == true) {
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
                }, {
                  label: 'Active props',
                  routerLink: '/activeProps'
                }
                ]
              },
            ];
          }
          else {
            this.items = [
              {
                label: 'Online Quiz Generator',
                items: [{
                  label: 'Proposition list',
                  routerLink: '/props',
                }
                ]
              },
            ];
          }

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
