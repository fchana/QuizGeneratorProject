import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { Select } from 'app/shared/Model/select';
import { User } from 'app/shared/Model/user';
import { map, Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Score } from 'app/shared/Model/score';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-t-view-ans',
  templateUrl: './t-view-ans.component.html',
  styleUrls: ['./t-view-ans.component.scss']
})
export class TViewAnsComponent implements OnInit {
  value: number;
  state$: Observable<object>;
  quizs!: Array<Quiz>;
  proposition: Proposition;
  score: Array<Score>;
  selects: Select[] = [];
  max_score: number;
  allUser: Array<User>;
  profileJson: User;
  propIndex: number;
  userIndex: number;
  sourceProducts: any;
  email: any;
  index: number;
  items: MenuItem[];

  home: MenuItem;

  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient, public auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
    this.email = window.history.state.email;
    this.index = window.history.state.index;
    this.CallProfile();
    this.home = { icon: 'pi pi-home', routerLink: '/props', label: ' Home' };
    this.items = [
      {label: 'Student list', routerLink: '/allStudent'},
      {label: 'Result'}
    ];
  }

  CallProfile() {
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<User>('/api/user/' + this.email).subscribe((response) => {
          this.profileJson = response;
          this.quizs = response.score[this.index].proposition.quiz;
          this.proposition = response.score[this.index].proposition;
          this.selects = response.score[this.index].selects;
          

        }
        )))
  }

}
