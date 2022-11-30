import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { User} from 'app/shared/Model/user';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.component.html',
  styleUrls: ['./view-score.component.scss']
})
export class ViewScoreComponent implements OnInit {
  sourceProducts: User[];
  profileJson?: User;
  proposition!: Proposition[];

  constructor(private http: HttpClient, public auth: AuthService) {
    
   }

  ngOnInit(): void {
    this.CallProfile();
  }

  CallProfile(){
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<any>('/api/user/getAllStd').subscribe((response) => {
          this.sourceProducts = response;
          console.log(this.sourceProducts)
        })
      )
    );
  }

}
