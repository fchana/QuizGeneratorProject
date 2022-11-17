import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Choice } from 'app/shared/Model/choice';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { Select } from 'app/shared/Model/select';
import { User } from 'app/shared/Model/user';
import { map, Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-view-answer',
  templateUrl: './view-answer.component.html',
  styleUrls: ['./view-answer.component.scss']
})
export class ViewAnswerComponent implements OnInit {

  value: number;
  state$: Observable<object>;
  quizs!: Array<Quiz>;
  proposition: Proposition;
  score: number = 0;
  selects: Select[] = [];
  max_score: number;
  allUser: Array<User>;
  profileJson: User;
  propIndex: number;
  userIndex: number;


  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient, public auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
    this.proposition = window.history.state.prop;
    this.value = window.history.state.prop.max_score;
    this.quizs = window.history.state.quizs;
    this.selects = window.history.state.selects;
    this.max_score = window.history.state.prop.max_score;
    this.profileJson = window.history.state.profileJson;
    this.CheckAns();
  }

  CheckAns() {
    this.http.get('/api/user/').subscribe(async (response: any) => {
      this.allUser = response;
      this.allUser.forEach((t: { proposition: any[]; }, index) => {

        this.propIndex = (t.proposition.findIndex((p: any) => {
          if (p.prop_name == this.proposition.prop_name) {
            this.userIndex = index;
            return p.prop_name = this.proposition.prop_name;
          }
          else
            return null
        }))

        if (this.propIndex != -1) {
          console.log(this.allUser[this.userIndex].proposition[this.propIndex].allowed)
          console.log("index : ", this.allUser[this.userIndex].proposition[this.propIndex].allowed.findIndex((p: any) => {
            return p == this.profileJson.id
          }))
          this.allUser[this.userIndex].proposition[this.propIndex].allowed.splice(this.allUser[this.userIndex].proposition[this.propIndex].allowed.findIndex((p: any) => {
            return p == this.profileJson.id;
          }), 1)

          console.log(this.allUser[this.userIndex].proposition[this.propIndex].allowed)

          const userUpdate = {
            allowed: this.allUser[this.userIndex].proposition[this.propIndex].allowed,
            max_score: this.allUser[this.userIndex].proposition[this.propIndex].max_score,
            prop_name: this.allUser[this.userIndex].proposition[this.propIndex].prop_name,
            prop_time: this.allUser[this.userIndex].proposition[this.propIndex].prop_time,
            quiz: this.allUser[this.userIndex].proposition[this.propIndex].quiz,
            quiz_amount: this.allUser[this.userIndex].proposition[this.propIndex].quiz_amount,
            start_date: this.allUser[this.userIndex].proposition[this.propIndex].start_date,
            active: this.allUser[this.userIndex].proposition[this.propIndex].active
          }

          this.allUser[this.userIndex]?.proposition.splice(this.propIndex, 1, userUpdate);
          this.http.put('/api/user/' + this.allUser[this.userIndex]?.id, this.allUser[this.userIndex]).subscribe((response) => {
            console.log(response);
          })

        }

      });

    })

    this.quizs.forEach((quiz, i) => {
      var temp = 0;
      quiz.choice.forEach((choice: Choice, k) => {
        if (this.selects[i].select[k] != undefined) {
          if (choice.correct == this.selects[i].select[k]) {
            temp += 1;
          }
        }
      });
      if (temp == quiz.choice_amount) {
        this.score += quiz.score;
      }
    });
  }

}

