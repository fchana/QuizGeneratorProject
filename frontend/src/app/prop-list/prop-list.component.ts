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
            const hours: number = Math.floor(new Date(this.profileJson.proposition[0].start_date).getHours());
            const minutes: number = Math.floor(new Date(this.profileJson.proposition[0].start_date).getMinutes());
            const seconds: number = Math.floor(new Date(this.profileJson.proposition[0].start_date).getSeconds());
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