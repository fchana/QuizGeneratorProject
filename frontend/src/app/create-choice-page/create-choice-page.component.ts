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
  selector: 'app-create-choice-page',
  templateUrl: './create-choice-page.component.html',
  styleUrls: ['./create-choice-page.component.scss']
})
export class CreateChoicePageComponent implements OnInit {
  gfg: any[];
  profileJson!: User;
  proposition!: Proposition[];

  quiz: [];
  id: any;
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
    this.id = this.route.snapshot.paramMap.get('id');
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

    this.profileJson?.proposition[this.pid].quiz[this.qid].choice.splice(this.id, 1, userUpdate);

    this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
      console.log(response);
    })
    console.log(this.choiceCorrectInput)
  }

}
