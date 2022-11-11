import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Choice } from 'app/shared/Model/choice';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
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
  profileJson?: User;
  status: number = 1;


  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient) {
    console.log("Result Page : ")
  }

  async ngOnInit(): Promise<void> {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
    this.proposition = window.history.state.prop;
    this.value = window.history.state.prop.max_score;
    this.quizs = window.history.state.quizs;
    this.selects = window.history.state.selects;
    this.profileJson = window.history.state.profileJson;



    this.CheckAns();
  }

  CheckAns() {
    console.log("profileJson", this.profileJson)
    this.quizs.forEach((quiz, i) => {
      var temp = 0;
      quiz.choice.forEach((choice: Choice, k) => {
        if (choice.correct == this.selects[i].select[k]) {
          temp += 1;
        }
      });
      if (temp == quiz.choice_amount) {
        this.score += quiz.score;
      }
      console.log("score: ", this.score);
      const score = {
        score: this.score,
        proposition: this.proposition,
        selects: this.selects
      }


      if (this.status == 1) {
        this.status = 0;
        this.profileJson?.score.push(score);

        this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
          console.log("updated", response);
        })
      }
      // console.log(this.choiceCorrectInput)
    });


  }

}
