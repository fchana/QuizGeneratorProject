import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Choice } from 'app/shared/Model/choice';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { User } from 'app/shared/Model/user';


@Component({
  selector: 'app-edit-choice-page',
  templateUrl: './edit-choice-page.component.html',
  styleUrls: ['./edit-choice-page.component.scss']
})
export class EditChoicePageComponent implements OnInit {
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
  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute) { 
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
          this.choiceContentInput = this.profileJson.proposition[this.pid].quiz[this.qid].choice[this.cid].content;
          this.choiceCorrectInput = this.profileJson.proposition[this.pid].quiz[this.qid].choice[this.cid].correct;
          console.log(this.profileJson.proposition[this.pid].quiz[this.qid].choice[this.cid])
      })
      ),
      );
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

    this.profileJson?.proposition[this.pid].quiz[this.qid].choice.splice(this.cid, 1, userUpdate);

    this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
      console.log(response);
    })
    console.log(this.choiceCorrectInput)
  }
  EditQuiz(){
    const userUpdate = {
      content: this.choiceContentInput,
      correct: this.choiceCorrectInput,
  }

  this.profileJson?.proposition[this.pid].quiz[this.qid].choice.splice(this.cid,  1, userUpdate);
  // this.profileJson?.proposition.push(userUpdate);

  this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
    console.log(response);
  })

}

}
