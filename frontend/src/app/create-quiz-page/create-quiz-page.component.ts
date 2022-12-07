import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Choice } from 'app/shared/Model/choice';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { User } from 'app/shared/Model/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-quiz-page',
  templateUrl: './create-quiz-page.component.html',
  styleUrls: ['./create-quiz-page.component.scss']
})
export class CreateQuizPageComponent implements OnInit {

  quizContentform = new FormControl(null, [Validators.required])
  choiceTypeForm = new FormControl(null, [Validators.required])
  quizLimitForm = new FormControl(null, [Validators.required])
  choiceAmountForm = new FormControl(null, [Validators.required])
  quizScoreForm = new FormControl(null, [Validators.required])

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
  choiceContentInput: String;
  choiceCorrectInput: boolean;
  choices: Array<Choice> = [];
  constructor(private http: HttpClient, public auth: AuthService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) { 
    
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

  invalid(){
    return (this.quizContentform.hasError('required')||this.quizLimitForm.hasError('required')||this.quizScoreForm.hasError('required')||this.choiceTypeForm.hasError('required')||this.choiceAmountForm.hasError('required'))
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
      choice: this.choices,
      score: this.scoreInput
    }

    this.profileJson?.proposition[this.pid].quiz.splice(this.id, 1, userUpdate);

    this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
      console.log(response);
      this.messageService.add({severity: 'success', summary: 'quiz create.', detail: 'quiz created success.' });
      this.router.navigateByUrl('/props/'+this.pid+"/quizs");
    })
  
  }

}
