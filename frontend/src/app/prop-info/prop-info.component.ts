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

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {

    this.CallProfile();
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
                  if (p.allowed.includes(this.profileJson?.id)) {
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
