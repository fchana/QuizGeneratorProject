import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { User } from 'app/shared/Model/user';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

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
  items: MenuItem[];

  home: MenuItem;

  constructor(private http: HttpClient, public auth: AuthService, private messageService: MessageService, private route: ActivatedRoute, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pid = this.route.snapshot.paramMap.get('pid');
    this.CallProfile();
    this.items = [
      {label: 'Quiz'}
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/props', label: ' Home' };
  }

  DeleteQuiz(index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure to delete this quiz?',
      accept: () => {
        this.profileJson?.proposition[this.id].quiz.splice(index, 1);
        if (this.profileJson?.proposition[this.id].quiz_amount != undefined) {
          this.profileJson.proposition[this.id].quiz_amount -= 1;
        }
        this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
          this.CallProfile();
          this.messageService.add({ severity: 'success', summary: 'quiz delete.', detail: 'quiz deleted success.' });

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
}
