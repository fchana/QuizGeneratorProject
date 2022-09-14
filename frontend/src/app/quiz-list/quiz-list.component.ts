import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/Model/proposition';
import { Quiz } from 'app/Model/quiz';
import { User } from 'app/Model/user';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  
  profileJson?: User;
  proposition!: Proposition[];
  quiz: Quiz[];
  id: any;
  condition: false;
  user: any;
  pid: any;

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pid = this.route.snapshot.paramMap.get('pid');
    this.CallProfile();
    }

    DeleteQuiz(index: number){
      this.profileJson?.proposition[this.id].quiz.splice(index, 1);
      if (this.profileJson?.proposition[this.id].quiz_amount != undefined) {
        this.profileJson.proposition[this.id].quiz_amount -= 1;
      }
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
            this.quiz = this.proposition[this.id].quiz;
            console.log(this.quiz);
        })
        ),
        );
    }

}
