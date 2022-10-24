import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { User } from 'app/shared/Model/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-active-prop',
  templateUrl: './active-prop.component.html',
  styleUrls: ['./active-prop.component.scss'],
  providers: [MessageService]
})
export class ActivePropComponent implements OnInit {
  profileJson?: User;
  proposition: Proposition[] = [];
  allUser!: Array<User>;

  constructor(private http: HttpClient, public auth: AuthService, private messageService: MessageService) { }

  active: Array<boolean> = [];

  ngOnInit(): void {

    this.CallProfile();
  }

  DeleteProp(index: number) {
    this.profileJson?.proposition.splice(index, 1);
    this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
      this.CallProfile();
    })

  }

  DateAdder(date: Date, time: number): Date {
    var _date = new Date(date);
    var day = _date.getDate();
    var hours = _date.getHours();
    var minutes = _date.getMinutes();
    var seconds = _date.getSeconds();
    var month = _date.getMonth();
    var year = _date.getFullYear();
    var __date = new Date(year, month, day, hours, minutes, seconds + time);

    return __date;

  }

  CallProfile() {
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
          this.profileJson = response;
          this.proposition = this.profileJson.proposition;
          this.proposition.forEach((prop, index) => {
            this.active.push(prop.active);
          });
        })
      ),
    );
  }

  Active(index: number) {
    var propScore = 0;
    var propTime = 0;
    var contentEr = 0;
    var errorAr: Array<number> = [];
    var hasEr = 0;
    this.proposition[index].quiz.forEach(quiz => {
      console.log(quiz)
    });
    this.proposition[index].quiz.forEach((quiz, i) => {
      propScore += quiz.score;
      propTime += quiz.time_limit;
      if (quiz.content == '' || quiz.choice_type == 0 || quiz.time_limit == 0 || quiz.choice_amount == 0) {
        contentEr += 1;
        errorAr.push(i + 1);
      }
    });
    if (contentEr != 0) {
      hasEr += 1;
      this.messageService.add({ severity: 'error', summary: 'Proposition Activation Failed', detail: 'Please complete your quiz. ' + contentEr + ' quiz amount error found. ' + errorAr });
    }
    if (this.proposition[index].active == false && propScore != Number(this.proposition[index].max_score)) {
      hasEr += 1;
      this.messageService.add({ severity: 'error', summary: 'Proposition Activation Failed', detail: 'Please enter a valid proposition score.' });
    }
    if (this.proposition[index].active == false && propTime > Number(this.proposition[index].prop_time)) {
      hasEr += 1;
      this.messageService.add({ severity: 'error', summary: 'Proposition Activation Failed', detail: 'Please enter a valid propposition time limit.' });
    }
    if (this.proposition[index].active == false && new Date(this.proposition[index].start_date).getTime() < Date.now()) {
      hasEr += 1;
      this.messageService.add({ severity: 'error', summary: 'Proposition Activation Failed', detail: 'Please enter a valid date.' });
    }
    else if(hasEr == 0) {
      this.active[index] = !this.proposition[index].active;
      const userUpdate = {
        allowed: this.proposition[index].allowed,
        max_score: this.proposition[index].max_score,
        prop_name: this.proposition[index].prop_name,
        prop_time: this.proposition[index].prop_time,
        quiz: this.proposition[index].quiz,
        quiz_amount: this.proposition[index].quiz_amount,
        start_date: this.proposition[index].start_date,
        active: this.active[index]
      }

      this.profileJson?.proposition.splice(index, 1, userUpdate);

      this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
        console.log(response);
      })
      if (this.proposition[index].active == true) {
        this.messageService.add({ severity: 'success', summary: 'Proposition Activate', detail: 'Proposition Activated Success' });
      }
      else
        this.messageService.add({ severity: 'success', summary: 'Proposition Deactivate', detail: 'Proposition Deactivated Success' });

    }
  }

}