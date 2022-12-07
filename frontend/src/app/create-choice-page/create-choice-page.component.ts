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
  selector: 'app-create-choice-page',
  templateUrl: './create-choice-page.component.html',
  styleUrls: ['./create-choice-page.component.scss']
})
export class CreateChoicePageComponent implements OnInit {

  choiceContentform = new FormControl(null, [Validators.required])

  gfg: any[];
  profileJson!: User;
  proposition!: Proposition[];

  quiz: [];
  cid: any;
  pid: any;
  qid: any;
  choiceContentInput: String;
  choiceCorrectInput: boolean;
  choices: Array<Choice> = [];
  constructor(private http: HttpClient, public auth: AuthService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) { 
    this.gfg = [
      { label: "Off", value: false },
      { label: "On", value: true }
    ];  
  }


  ngOnInit(): void {
    this.cid = this.route.snapshot.paramMap.get('cid');
    this.qid = this.route.snapshot.paramMap.get('qid');
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
    if(this.choiceCorrectInput === undefined || this.choiceContentform.hasError("required") === true)
      return true
    else
      return false
  }

  CreateChoice(){
    // for(let i = 0; i< this.choiceAmountInput; i++)
    //  this.choices.push({
    //   content: "",
    //   correct: false
    // });
    const userUpdate = {
      content: this.choiceContentInput,
      correct: this.choiceCorrectInput
    }
    console.log(this.cid)

    this.profileJson?.proposition[this.pid].quiz[this.qid].choice.splice(this.cid, 1, userUpdate);

    this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
      console.log(response);
      this.messageService.add({severity: 'success', summary: 'choice create.', detail: 'choice created success.' });
      this.router.navigateByUrl('/props/'+this.pid+"/quizs/"+this.qid+"/choice");


    })
    console.log(this.choiceCorrectInput)
  }

}
