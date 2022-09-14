import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Choice } from 'app/Model/choice';
import { Proposition } from 'app/Model/proposition';
import { Quiz } from 'app/Model/quiz';
import { User } from 'app/Model/user';

@Component({
  selector: 'app-create-quiz-page',
  templateUrl: './create-quiz-page.component.html',
  styleUrls: ['./create-quiz-page.component.scss']
})
export class CreateQuizPageComponent implements OnInit {
  profileJson!: User;
  proposition!: Proposition[];

  quizContentInput: String;
  choiceTypeInput: number;
  timeLimitInput: number;
  choiceAmountInput: number;
  quiz: [];
  id: any;
  pid: any;
  choiceContentInput: String;
  choiceCorrectInput: boolean;
  choices: Array<Choice> = [];
  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute) { 
    
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pid = this.route.snapshot.paramMap.get('pid');
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
          this.profileJson = response;
          this.proposition = this.profileJson.proposition;
      })
      ),
      );
  }

  CreateQuiz(){
    for(let i = 0; i< this.choiceAmountInput; i++)
     this.choices.push({
      content: "",
      correct: false
    });
    const userUpdate = {
      content: this.quizContentInput,
      choice_type: this.choiceTypeInput,
      time_limit: this.timeLimitInput,
      choice_amount: this.choiceAmountInput,
      choice: this.choices
    }

    this.profileJson?.proposition[this.pid].quiz.splice(this.id, 1, userUpdate);

    this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
      console.log(response);
    })
  
  }

}
