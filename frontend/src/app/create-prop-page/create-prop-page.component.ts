  import { Time } from '@angular/common';
  import { HttpClient } from '@angular/common/http';
  import { Component, OnInit } from '@angular/core';
  import { AuthService } from '@auth0/auth0-angular';
  import { Proposition } from 'app/shared/Model/proposition';
  import { Quiz } from 'app/shared/Model/quiz';
  import { User } from 'app/shared/Model/user';
  import { ActivatedRoute, Router } from '@angular/router';
  import { MessageService } from 'primeng/api';
import { FormControl, Validators } from '@angular/forms';

  @Component({
    selector: 'app-create-prop-page',
    templateUrl: './create-prop-page.component.html',
    styleUrls: ['./create-prop-page.component.scss']
  })
  export class CreatePropPageComponent implements OnInit {

    propNameForm = new FormControl(null, [Validators.required])
    maxScoreForm = new FormControl(null, [Validators.required])
    timeLimitForm = new FormControl(null, [Validators.required])
    quizAmountForm = new FormControl(null, [Validators.required])

    profileJson?: User;
    proposition!: Proposition[];
    value: any;
    propNameInput: string;
    maxScoreInput: string;
    timeLimitInput: string;
    quizAmountInput: number;
    startDateInput: Date;
    startTimeInput: Time;
    allowed: Array<String> = [];
    quizs: Array<Quiz> = [];
    enableScoreInput: boolean;
    gfg: { label: string; value: boolean; }[];
    constructor(private http: HttpClient, public auth: AuthService, private router: Router, private messageService: MessageService) {
      this.gfg = [
        { label: "Off", value: false },
        { label: "On", value: true }
      ];
      this.enableScoreInput = false;
    }


    ngOnInit(): void {
      this.auth.idTokenClaims$.subscribe(
        (profile) => (
          this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
            this.profileJson = response;
            this.proposition = this.profileJson.proposition;
            this.startDateInput = new Date(Date.now());
            // console.log(new Date(Date.now()));
          })
        ),
      );
    }

    invalid(){
      return (this.propNameForm.hasError('required')||this.maxScoreForm.hasError('required')||this.timeLimitForm.hasError('required')||this.quizAmountForm.hasError('required'))
    }

    Selected() {

      console.log(new Date(new Date(this.startDateInput.getTime()).setSeconds(0, 0)))

      // console.log(new Date (parseInt(((this.startDateInput.getTime()/10000).toString())+"0000")));

      // console.log(new Date(this.startDateInput.getTime()));
    }

    CreateProp() {
      console.log(this.startDateInput.toUTCString());
      for (let i = 0; i < this.quizAmountInput; i++) this.quizs.push({
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
        // start_date: new Date(Date.now()),
        start_date: new Date(new Date(this.startDateInput.getTime()).setSeconds(0, 0) + 25200000),
        active: false,
        enable_score: this.enableScoreInput
      }

      console.log(userUpdate);

      this.profileJson?.proposition.push(userUpdate);


      this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Proposition create.', detail: 'Proposition created success.' });
        this.router.navigateByUrl('/props');
      })


    }

  }
