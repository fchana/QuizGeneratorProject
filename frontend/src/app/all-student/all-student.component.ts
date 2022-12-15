import { Component, OnInit } from '@angular/core';
import { User } from 'app/shared/Model/user';
import { Proposition } from 'app/shared/Model/proposition';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-all-student',
  templateUrl: './all-student.component.html',
  styleUrls: ['./all-student.component.scss']
})
export class AllStudentComponent implements OnInit {

  selectedProp: any;

  sourceProducts: User[];

  avaliableStudent: User[];

  targetProducts: User[];
  profileJson?: User;
  proposition!: Proposition[];
  items: MenuItem[];

  home: MenuItem;

  constructor(private http: HttpClient, public auth: AuthService) { }

  ngOnInit(): void {
    this.CallProfile();
    console.log(this.sourceProducts)
    this.home = { icon: 'pi pi-home', routerLink: '/props', label: ' Home' };
  }

  CallProfile() {
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<any>('/api/user/getAllStd').subscribe((response) => {
          this.sourceProducts = response;
          console.log(response)
        })
      )
    );
  }

}
