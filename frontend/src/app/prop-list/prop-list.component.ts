import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { User } from 'app/shared/Model/user';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-prop-list',
  templateUrl: './prop-list.component.html',
  styleUrls: ['./prop-list.component.scss'],
  providers: [MessageService]

})
export class PropListComponent implements OnInit {

  profileJson?: User;
  proposition: Proposition[] = [];
  allUser!: Array<User>;

  constructor(private http: HttpClient, public auth: AuthService, private messageService: MessageService) { }


  ngOnInit(): void {

    this.CallProfile();
  }

  DeleteProp(index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this proposition?',
      accept: () => {
        this.profileJson?.proposition.splice(index, 1);
        this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
          this.CallProfile();
        })
      }
    });

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
          if (this.profileJson?.account_type == true) {
            this.proposition = this.profileJson.proposition;
          }
          else {
            this.http.get('/api/user/').subscribe((response: any) => {
              this.allUser = response.filter((check: { account_type: boolean; }) => {
                return check.account_type == true;
              })
              this.allUser.forEach(t => {
                t.proposition.forEach((p: any) => {
                  if (p.allowed.includes(this.profileJson?.id) && (Date.now() >= new Date(p.start_date).getTime()) && Date.now() <= this.DateAdder(p.start_date, p.prop_time).getTime() && p.active == true) {
                    this.proposition.push(p);
                    console.log(this.proposition[0]);
                  }
                })
              });
            })
          }
        })
      ),
    );
  }
}

  timeIsOver(id: any) {
    var totalTime = 0;
    this.proposition[id].quiz.forEach(quiz => {
      totalTime += quiz.time_limit;
    });
    if (Number(this.proposition[id].prop_time) >= totalTime) {
      return true;
    }
    else {
      return false;
    }
  }

  scoreIsOver(id: any) {
    var totalScore = 0;
    this.proposition[id].quiz.forEach(quiz => {
      totalScore += quiz.score;
    });
    if (Number(this.proposition[id].max_score) == totalScore) {
      return true;
    }
    else {
      return false;
    }
  }

  dateIsOver(id: any) {
    if (new Date(this.proposition[id].start_date).getTime() > Date.now()) {
      return true;
    }
    else {
      return false;
    }
  }

}

