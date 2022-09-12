import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/Model/proposition';
import { User } from 'app/Model/user';

@Component({
  selector: 'app-prop-list',
  templateUrl: './prop-list.component.html',
  styleUrls: ['./prop-list.component.scss']
})
export class PropListComponent implements OnInit {

  profileJson?: User;
  proposition!: Proposition[];

  constructor(private http: HttpClient, public auth: AuthService) { }

  ngOnInit(): void {

    this.CallProfile();
    }

    DeleteProp(index: number){
      this.profileJson?.proposition.splice(index, 1);

      this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
        this.CallProfile();
      })

    }

    CallProfile(){
      this.auth.idTokenClaims$.subscribe(
        (profile) => (
          this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
            this.profileJson = response;
            this.proposition = this.profileJson.proposition;
        })
        ),
        );
    }

  }


  // this.profileJson = JSON.stringify(profile, null, 2)