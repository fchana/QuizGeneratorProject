import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { User } from 'app/shared/Model/user';

@Component({
  selector: 'app-prop-info',
  templateUrl: './prop-info.component.html',
  styleUrls: ['./prop-info.component.scss']
})
export class PropInfoComponent implements OnInit {

  profileJson?: User;
  proposition: Proposition[] = [];
  allUser!: Array<User>;
  id: any;
  prop: Proposition;
  propTime: number;
  disable: boolean = true;

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {

    this.CallProfile();
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
              // console.log("all teacher : ", this.allUser)
              this.allUser.forEach(t => {
                t.proposition.forEach((p: any) => {
                  if (p.allowed.includes(this.profileJson?.id) && p.active == true && new Date(Date.now()) <= new Date(this.DateAdder(p.start_date, p.prop_time).getTime())) {
                    // console.log(Date.now() <= this.DateAdder(p.start_date, p.prop_time).getTime() )
                    // console.log("Start date : ", && new Date(Date.now()) <= new Date(this.DateAdder(p.start_date, p.prop_time).getTime()))
                    console.log("Date now : ", new Date(Date.now()), "\nStart date : " , new Date(p.start_date), Date.now() >= new Date(p.start_date).getTime())
                    if((Date.now() >= new Date(p.start_date).getTime())){
                      this.disable = false;
                    }
                    this.proposition.push(p);
                  }
                })
              });
              this.prop = this.proposition[this.id];
              this.propTime = Number(this.prop.prop_time);
              console.log("prop: ", this.prop.prop_name, " id: ", this.id, " propTime : ", typeof(this.propTime));
            })
          }
        })
      ),
    );
  }


}
