import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Choice } from 'app/Model/choice';
import { Proposition } from 'app/Model/proposition';
import { Quiz } from 'app/Model/quiz';
import { User } from 'app/Model/user';

@Component({
  selector: 'app-choice-list',
  templateUrl: './choice-list.component.html',
  styleUrls: ['./choice-list.component.scss']
})
export class ChoiceListComponent implements OnInit {
  profileJson?: User;
  proposition!: Proposition[];
  choice: Choice[];
  quiz: Quiz[];
  qid: any;
  condition: false;
  user: any;
  pid: any;

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.pid = this.route.snapshot.paramMap.get('pid');
    this.qid = this.route.snapshot.paramMap.get('qid');
    this.CallProfile();
    }

    DeleteChoice(index: number){
      this.profileJson?.proposition[this.pid].quiz[this.qid].choice.splice(index, 1);
      if (this.profileJson?.proposition[this.pid].quiz[this.qid].choice_amount != undefined) {
        if(this.profileJson?.proposition[this.pid].quiz[this.qid].choice_amount > 0){
          this.profileJson.proposition[this.pid].quiz[this.qid].choice_amount -= 1;
        }
        else
          this.profileJson.proposition[this.pid].quiz[this.qid].choice_amount = 0;
      }
      this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
        this.CallProfile();
      })

    }

    CallProfile(){
      this.auth.idTokenClaims$.subscribe(
        (profile) => (
          this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
            this.profileJson = response;
            this.proposition = this.profileJson.proposition;
            this.quiz = this.proposition[this.pid].quiz;
            this.choice = this.proposition[this.pid].quiz[this.qid].choice;
            console.log(this.choice);
        })
        ),
        );
    }

    AddChoice(){
      this.profileJson?.proposition[this.pid].quiz[this.qid].choice.push({
        content: "",
        correct: false
      })
      if (this.profileJson?.proposition[this.pid].quiz[this.qid].choice_amount != undefined) {
        this.profileJson.proposition[this.pid].quiz[this.qid].choice_amount += 1;
      }
      this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
        console.log(response);
      })
    }
}

