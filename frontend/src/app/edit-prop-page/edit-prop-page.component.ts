import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { User } from 'app/shared/Model/user';
import { MessageService } from 'primeng/api';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-prop-page',
  templateUrl: './edit-prop-page.component.html',
  styleUrls: ['./edit-prop-page.component.scss'],
  providers: []
})
export class EditPropPageComponent implements OnInit {

  propNameForm = new FormControl(null, [Validators.required])
  maxScoreForm = new FormControl(null, [Validators.required])
  timeLimitForm = new FormControl(null, [Validators.required])

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
  enable_score: boolean;
  enableScoreInput: boolean;
  gfg: { label: string; value: boolean; }[];

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute, private messageService: MessageService, private router: Router) {
    this.gfg = [
      { label: "Off", value: false },
      { label: "On", value: true }
    ];
   }

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
          this.active = this.profileJson?.proposition[this.id].active,
          this.enableScoreInput = this.profileJson?.proposition[this.id].enable_score
        })
      ),
    );


  }

  invalid(){
    return (this.propNameForm.hasError('required')||this.maxScoreForm.hasError('required')||this.timeLimitForm.hasError('required'))
  }

  Selected() {
    console.log(this.startDateInput.getTime())

    console.log(this.startDateInput.getTime() / 10000)

    console.log(new Date(parseInt(((this.startDateInput.getTime() / 10000).toString()) + "0000")));

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
        start_date: new Date(new Date(this.startDateInput.getTime()).setSeconds(0, 0) + 25200000),
        active: this.active,
        enable_score: this.enableScoreInput
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
        start_date: new Date(new Date(this.startDateInput.getTime()).setSeconds(0, 0) + 25200000),
        active: this.active,
        enable_score: this.enableScoreInput
      }
      // setInterval(function() {_this.router.navigateByUrl('/props');}, 2000);
      this.profileJson?.proposition.splice(this.id, 1, userUpdate);
    }
    this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
      // setTimeout(function () { _this.router.navigateByUrl('/props'); }, 2000);
      console.log(response);
      this.messageService.add({ severity: 'success', summary: 'Proposition edit.', detail: 'Edit success.' });
      this.router.navigate(['/props'])
    })

    var _this = this;


  }


}
