import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { User } from 'app/shared/Model/user';

@Component({
  selector: 'app-create-prop-page',
  templateUrl: './create-prop-page.component.html',
  styleUrls: ['./create-prop-page.component.scss']
})
export class CreatePropPageComponent implements OnInit {
  profileJson?: User;
  proposition!: Proposition[];

  propNameInput: string;
  maxScoreInput: string;
  timeLimitInput: string;
  quizAmountInput: number;
  startDateInput: Date  ;
  startTimeInput: Time;
  allowed: Array<String> = [];
  quizs: Array<Quiz> = [];
  constructor(private http: HttpClient, public auth: AuthService) { 
    
  }


  ngOnInit(): void {
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
          this.profileJson = response;
          this.proposition = this.profileJson.proposition;
      })
      ),
      );
  }

  CreateProp(){
    for(let i = 0; i< this.quizAmountInput; i++) this.quizs.push({
      choice: [],
      content: "",
      choice_type: 0,
      time_limit: 0,
      choice_amount: 0,
      score: 0,
    });
    const userUpdate = {
      allowed: this.allowed,
      max_score: this.maxScoreInput,
      prop_name: this.propNameInput,
      prop_time: this.timeLimitInput,
      quiz: this.quizs, 
      quiz_amount: this.quizAmountInput,
      start_date: this.startDateInput,
    }

    this.profileJson?.proposition.push(userUpdate);

    this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
      console.log(response);
    })
  
  }

}
