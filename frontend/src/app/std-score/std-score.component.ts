import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { Score } from 'app/shared/Model/score';
import { User } from 'app/shared/Model/user';
import { ConfirmationService, MessageService } from 'primeng/api';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-std-score',
  templateUrl: './std-score.component.html',
  styleUrls: ['./std-score.component.scss']
})
export class StdScoreComponent implements OnInit {

  profileJson?: User;
  proposition: Proposition[] = [];
  allUser!: Array<User>;
  active: Array<boolean> = [];
  scores: Array<Score> = [];
  state$: Observable<object>;
  email: string;
  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient, public auth: AuthService, private messageService: MessageService, private confirmationService: ConfirmationService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
    this.email = window.history.state.email;
    console.log("Email : ", this.email)
    this.CallProfile();
  }

  CallProfile() {
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<User>('/api/user/' + this.email).subscribe((response) => {
          this.profileJson = response;
          this.scores = response.score;
          console.log(this.scores)
        }
        )))
  }

}
