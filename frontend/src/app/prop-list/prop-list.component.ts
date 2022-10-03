import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { User } from 'app/shared/Model/user';

@Component({
  selector: 'app-prop-list',
  templateUrl: './prop-list.component.html',
  styleUrls: ['./prop-list.component.scss']
})
export class PropListComponent implements OnInit {

  x: number = 0;
  profileJson?: User;
  proposition: Proposition[] = [];
  allUser!: Array<User>;

  constructor(private http: HttpClient, public auth: AuthService) { }

  ngOnInit(): void {

    this.CallProfile();
  }

  DeleteProp(index: number) {
    this.profileJson?.proposition.splice(index, 1);
    this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
      this.CallProfile();
    })

  }

  DateAdder(date: Date, time: number): any {
    const _date = new Date(date);
    var day = _date.getDay();
    var hours = _date.getHours();
    var minutes = _date.getMinutes();
    var seconds = _date.getSeconds();
    var month = _date.getMonth();
    var year = _date.getFullYear();
    const _time: number = time;
    var _seconds: number = Math.floor(seconds + _time) % 60;
    var _minutes: number = Math.floor(minutes + (seconds + _time) / 60) % 60;
    var _hours: number = Math.floor(hours + ((minutes + (seconds + _time) / 60) / 60)) % 60;
    var _day: number = Math.floor(day + (hours + ((minutes + (seconds + _time) / 60) / 60)) % 60) % 24;

    var __date = new Date(year, month, _day, _hours, _minutes, _seconds);
    this.x += 1;
    console.log( __date)

    return __date;

  }

  CallProfile() {
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
          this.profileJson = response;
          if (this.profileJson?.account_type == true) {
            this.proposition = this.profileJson.proposition;
            const hours: number = Math.floor(new Date(this.profileJson.proposition[0].start_date).getHours());
            const minutes: number = Math.floor(new Date(this.profileJson.proposition[0].start_date).getMinutes());
            const seconds: number = Math.floor(new Date(this.profileJson.proposition[0].start_date).getSeconds());
            console.log(hours, minutes, seconds);
          }
          else {
            this.http.get('/api/user/').subscribe((response: any) => {
              this.allUser = response.filter((check: { account_type: boolean; }) => {
                return check.account_type == true;
              })
              // console.log("all teacher : ", this.allUser)
              this.allUser.forEach(t => {
                t.proposition.forEach((p: any) => {
                  if (p.allowed.includes(this.profileJson?.id)) {
                    this.proposition.push(p);
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