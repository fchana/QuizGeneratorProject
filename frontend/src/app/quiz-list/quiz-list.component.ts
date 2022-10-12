import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { User } from 'app/shared/Model/user';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
  providers: [ConfirmationService]
})
export class QuizListComponent implements OnInit {

  profileJson?: User;
  proposition!: Proposition[];
  quiz: Quiz[];
  id: any;
  condition: false;
  user: any;
  pid: any;

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pid = this.route.snapshot.paramMap.get('pid');
    this.CallProfile();
  }

  DeleteQuiz(index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this quiz?',
      accept: () => {
        this.profileJson?.proposition[this.id].quiz.splice(index, 1);
        if (this.profileJson?.proposition[this.id].quiz_amount != undefined) {
          this.profileJson.proposition[this.id].quiz_amount -= 1;
        }
        this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
          this.CallProfile();
        })
      }
    });

  }

  CallProfile() {
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

  AddQuiz() {
    this.profileJson?.proposition[this.id].quiz.push({
      choice: [],
      content: "",
      choice_type: 0,
      time_limit: 0,
      choice_amount: 0,
      score: 0
    })
    if (this.profileJson?.proposition[this.id].quiz_amount != undefined) {
      this.profileJson.proposition[this.id].quiz_amount += 1;
    }
    this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
      console.log(response);
    })
  }

  getTextStyle() {
    if (true) {
      return {
        height: 40, backgroundColor: 'white', borderRadius: 5, padding: 10, borderWidth: 2, borderColor: 'red'
      }
    }
  }

  choiceIsSuc(quiz: Quiz) {
    var check = 0;
    quiz.choice.forEach(choice => {
      if (choice.correct == true) {
        check += 1;
      }
    });
    if (check == quiz.choice_type) {
      return true;
    }
    else
      return false;
  }

  timeIsOver() {
    var totalTime = 0;
    this.proposition[this.id].quiz.forEach(quiz => {
      totalTime += quiz.time_limit;
    });
    if (Number(this.proposition[this.id].prop_time) >= totalTime) {
      return true;
    }
    else {
      return false;
    }
  }

  scoreIsOver() {
    var totalScore = 0;
    this.proposition[this.id].quiz.forEach(quiz => {
      totalScore += quiz.score;
    });
    if (Number(this.proposition[this.id].max_score) >= totalScore) {
      return true;
    }
    else {
      return false;
    }
  }

}



