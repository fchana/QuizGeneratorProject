import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { User } from 'app/shared/Model/user';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-edit-prop-page',
  templateUrl: './edit-prop-page.component.html',
  styleUrls: ['./edit-prop-page.component.scss'],
  providers: []
})
export class EditPropPageComponent implements OnInit {
  profileJson?: User;
  proposition!: Proposition[];

  active: boolean;
  propNameInput: String;
  maxScoreInput: String;
  timeLimitInput: String;
  quizAmountInput: number;
  startDateInput: Date;
  startTimeInput: Time;
  allowed: Array<String>;
  quiz: [];
  id: any;

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
          this.profileJson = response;
          this.proposition = this.profileJson.proposition;
          this.propNameInput = this.profileJson.proposition[this.id].prop_name;
          this.maxScoreInput = this.profileJson.proposition[this.id].max_score;
          this.timeLimitInput = this.profileJson.proposition[this.id].prop_time;
          this.quizAmountInput = this.profileJson.proposition[this.id].quiz_amount;
          this.startDateInput = new Date(this.profileJson.proposition[this.id].start_date);
          this.active = this.profileJson?.proposition[this.id].active;
          console.log(this.startDateInput)
        })
      ),
    );


  }

  Selected() {
    console.log(this.startDateInput.getTime())
    console.log(new Date (parseInt(((Math.floor(this.startDateInput.getTime()/100000)).toString())+"00000")));

    console.log(new Date(this.startDateInput.getTime()));
   }

  EditProp() {
    try {
      const userUpdate = {
        allowed: this.proposition[this.id].allowed,
        max_score: this.maxScoreInput,
        prop_name: this.propNameInput,
        prop_time: this.timeLimitInput,
        quiz: this.proposition[this.id].quiz,
        quiz_amount: this.quizAmountInput,
        start_date: new Date((parseInt(((Math.floor(this.startDateInput.getTime()/100000)).toString())+"00000")) + 25200000),
        active: this.active
      }
      this.profileJson?.proposition.splice(this.id, 1, userUpdate);
    }
    catch (error) {
      const userUpdate = {
        allowed: this.proposition[this.id].allowed,
        max_score: this.maxScoreInput,
        prop_name: this.propNameInput,
        prop_time: this.timeLimitInput,
        quiz: this.proposition[this.id].quiz,
        quiz_amount: this.quizAmountInput,
        start_date: new Date(new Date((parseInt(((Math.floor(this.startDateInput.getTime()/100000)).toString())+"00000")) + 25200000)),
        active: this.active
      }
      // setInterval(function() {_this.router.navigateByUrl('/props');}, 2000);
      this.profileJson?.proposition.splice(this.id, 1, userUpdate);
    }
    this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
      // setTimeout(function () { _this.router.navigateByUrl('/props'); }, 2000);
      console.log(response);
      this.messageService.add({severity: 'success', summary: 'Proposition edit.', detail: 'Edit success.' });
      // this.messageService.add({key: 'myKey1', severity:'success', summary: 'Summary Text', detail: 'Detail Text'});
      this.router.navigate(['/props'])
    })

    var _this = this;


  }


}
