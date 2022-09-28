import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/Model/proposition';
import { Quiz } from 'app/Model/quiz';
import { User } from 'app/Model/user';

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
            })
            console.log("proposition ", this.proposition);
          }
        })
      ),
    );
  }
}