import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { User } from 'app/shared/Model/user';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-preview-prop',
  templateUrl: './preview-prop.component.html',
  styleUrls: ['./preview-prop.component.scss']
})
export class PreviewPropComponent implements OnInit {
  first: number = 0;

  totalRecords: number = 120;

  totalRecords2: number = 12;

  profileJson?: User;

  proposition!: Proposition[];

  quizs!: Array<Quiz>;

  pid: any;

  checked: boolean;

  isSelect: Array<any>[];
  items: MenuItem[];

  home: MenuItem;


  onPageChange(event: { first: number; }) {
      this.first = event.first;
  }

  refresh() {
      this.first = 0;
  }

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute) {
    this.pid = this.route.snapshot.paramMap.get('pid');
   }

  ngOnInit(): void {
    this.items = [

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/props', label: ' Home'};

    this.CallProfile();
    }

    CallProfile(){
      this.auth.idTokenClaims$.subscribe(
        (profile) => (
          this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
            this.profileJson = response;
            this.proposition = this.profileJson.proposition;
            this.quizs = this.proposition[this.pid].quiz;
            this.totalRecords2 = this.quizs.length;
        })
        ),
        );
    }

    Select(first: number, index: number){
      console.log(first);
      this.isSelect[first].push({
       index
      })
      console.log(this.isSelect)
    }

  }

