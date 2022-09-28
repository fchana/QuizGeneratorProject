import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { User } from 'app/shared/Model/user';

@Component({
  selector: 'app-edit-quiz-page',
  templateUrl: './edit-quiz-page.component.html',
  styleUrls: ['./edit-quiz-page.component.scss']
})
export class EditQuizPageComponent implements OnInit {
  profileJson!: User;
  proposition!: Proposition[];

  scoreInput: number;
  quizContentInput: String;
  choiceTypeInput: number;
  timeLimitInput: number;
  choiceAmountInput: number;
  quiz: [];
  id: any;
  pid: any;

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pid = this.route.snapshot.paramMap.get('pid');
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
          this.profileJson = response;
          this.proposition = this.profileJson.proposition;
          this.quizContentInput = this.profileJson.proposition[this.pid].quiz[this.id].content;
          this.choiceTypeInput = this.profileJson.proposition[this.pid].quiz[this.id].choice_type;
          this.timeLimitInput = this.profileJson.proposition[this.pid].quiz[this.id].time_limit;
          this.choiceAmountInput = this.profileJson.proposition[this.pid].quiz[this.id].choice_amount;
          this.scoreInput = this.profileJson.proposition[this.pid].quiz[this.id].score;
      })
      ),
      );
  }

  EditQuiz(){
      const userUpdate = {
        choice: this.profileJson.proposition[this.pid].quiz[this.id].choice,
        content: this.quizContentInput,
        choice_type: this.choiceTypeInput,
        time_limit: this.timeLimitInput,
        choice_amount: this.choiceAmountInput,
        score: this.scoreInput
    }

    this.profileJson?.proposition[this.pid].quiz.splice(this.id,  1, userUpdate);
    // this.profileJson?.proposition.push(userUpdate);

    this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
      console.log(response);
    })
  
  }



}
