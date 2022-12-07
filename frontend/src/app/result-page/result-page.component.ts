import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Choice } from 'app/shared/Model/choice';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { Score } from 'app/shared/Model/score';
import { Select } from 'app/shared/Model/select';
import { User } from 'app/shared/Model/user';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {
  value: number;
  state$: Observable<object>;
  quizs!: Array<Quiz>;
  proposition: Proposition;
  score: number = 0;
  selects: Select[] = [];
  profileJson: User;
  status: number = 1;
  allUser: Array<User>;
  propIndex: number;
  userIndex: number;


  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient) {
    console.log("proposition : ", this.proposition)
  }

  async ngOnInit(): Promise<void> {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
    this.proposition = window.history.state.prop;
    this.value = window.history.state.prop.max_score;
    this.quizs = window.history.state.quizs;
    this.selects = window.history.state.selects;
    this.profileJson = window.history.state.profileJson;

    console.log("proposition : ", this.proposition)

    this.CheckAns();
  }

  async CheckAns() {

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
            active: this.allUser[this.userIndex].proposition[this.propIndex].active,
            enable_score: this.allUser[this.userIndex].proposition[this.propIndex].enable_score

          }

          this.allUser[this.userIndex]?.proposition.splice(this.propIndex, 1, userUpdate);
          this.http.put('/api/user/' + this.allUser[this.userIndex]?.id, this.allUser[this.userIndex]).subscribe((response) => {
            console.log(response);
          })

        }

      });

    })

    console.log("profileJson", this.profileJson)
    
    await this.quizs.forEach((quiz, i) => {
      console.log("new quiz --------------------------")
      var temp = 0;
      quiz.choice.forEach((choice: Choice, k) => {
        if (choice.correct == this.selects[i].select[k]) {
          // console.log("correct : ", choice.correct," selects : ",  this.selects[i].select[k])
          temp += 1;
        }
      });
      if (temp == quiz.choice_amount) {
        console.log("equals")
        this.score += quiz.score;
      }
    });

    await this.SaveScore();

  }

  SaveScore() {
    if (this.status == 1) {
      this.status = 0;
      const score = {
        score: this.score,
        proposition: this.proposition,
        selects: this.selects
      }
      if (this.profileJson?.score != undefined) {
        this.profileJson?.score.push(score);
        this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
          console.log("updated", response);
        })
      }
      else {
        let Ascore: Array<Score> = [];
        Ascore.push(score);

        const userInfo = {
          id: this.profileJson.id,
          email: this.profileJson.email,
          username: this.profileJson.username,
          password: this.profileJson.password,
          firstname: this.profileJson.firstname,
          lastname: this.profileJson.lastname,
          account_type: this.profileJson.account_type,
          proposition: this.profileJson.proposition,
          score: Ascore
        }
        // this.profileJson?.score.push(score);

        this.http.put('/api/user/' + this.profileJson?.id, userInfo).subscribe((response) => {
          console.log("updated", response);
        })
      }
    }
  }

}
