import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/Model/proposition';
import { User } from 'app/Model/user';

@Component({
  selector: 'app-edit-prop-page',
  templateUrl: './edit-prop-page.component.html',
  styleUrls: ['./edit-prop-page.component.scss']
})
export class EditPropPageComponent implements OnInit {
  profileJson?: User;
  proposition!: Proposition[];

  propNameInput: String;
  maxScoreInput: String;
  timeLimitInput: String;
  quizAmountInput: number;
  startDateInput: Date  ;
  startTimeInput: Time;
  allowed: Array<String>;
  quiz: [];
  id: any;

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
          this.profileJson = response;
          this.proposition = this.profileJson.proposition;
          this.propNameInput = this.profileJson.proposition[this.id].prop_name;
          this.maxScoreInput = this.profileJson.proposition[this.id].max_score;
          this.timeLimitInput =  this.profileJson.proposition[this.id].prop_time;
          this.quizAmountInput = this.profileJson.proposition[this.id].quiz_amount;
          this.startDateInput = this.profileJson.proposition[this.id].start_date  ;
      })
      ),
      );
      

  }

  EditProp(){
      const userUpdate = {
      allowed: this.proposition[this.id].allowed,
      max_score: this.maxScoreInput,
      prop_name: this.propNameInput,
      prop_time: this.timeLimitInput,
      quiz: this.proposition[this.id].quiz,
      quiz_amount: this.quizAmountInput,
      start_date: this.startDateInput,
    }

    this.profileJson?.proposition.splice(this.id,  1, userUpdate);
    // this.profileJson?.proposition.push(userUpdate);

    this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
      console.log(response);
    })
  
  }


}
