import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Choice } from 'app/shared/Model/choice';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { User } from 'app/shared/Model/user';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-choice-list',
  templateUrl: './choice-list.component.html',
  styleUrls: ['./choice-list.component.scss']
})
export class ChoiceListComponent implements OnInit {
  profileJson?: User;
  proposition!: Proposition[];
  choice: Choice[];
  quiz: Quiz[];
  qid: any;
  condition: false;
  user: any;
  pid: any;
  items: MenuItem[];

  home: MenuItem;
  quizs: MenuItem;

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute, private confirmationService: ConfirmationService, private messageService: MessageService,) {
   }

  ngOnInit(): void {
    this.pid = this.route.snapshot.paramMap.get('pid');
    this.qid = this.route.snapshot.paramMap.get('qid');
    this.CallProfile();
    this.items = [
      {label: 'Quiz', routerLink: '/props/' + this.pid + '/quizs'},
      {label: 'Choice'}
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/props', label: ' Home' };
    // this.quizs = {routerLink: '/props' + this.pid + 'quizs'}
    }

    DeleteChoice(index: number){
      this.confirmationService.confirm({
        message: 'Are you sure to delete this choice?',
        accept: () => {
            this.profileJson?.proposition[this.pid].quiz[this.qid].choice.splice(index, 1);
            if (this.profileJson?.proposition[this.pid].quiz[this.qid].choice_amount != undefined) {
              if(this.profileJson?.proposition[this.pid].quiz[this.qid].choice_amount > 0){
                this.profileJson.proposition[this.pid].quiz[this.qid].choice_amount -= 1;
              }
              else
                this.profileJson.proposition[this.pid].quiz[this.qid].choice_amount = 0;
            }
            this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
              this.CallProfile();
              this.messageService.add({ severity: 'success', summary: 'choice delete.', detail: 'choice deleted success.' });

            })
        }
    });

    }

    CallProfile(){
      this.auth.idTokenClaims$.subscribe(
        (profile) => (
          this.http.get<User>('/api/user/' + profile?.email).subscribe((response) => {
            this.profileJson = response;
            this.proposition = this.profileJson.proposition;
            this.quiz = this.proposition[this.pid].quiz;
            this.choice = this.proposition[this.pid].quiz[this.qid].choice;
            console.log(this.choice);
        })
        ),
        );
    }

    AddChoice(){
      this.profileJson?.proposition[this.pid].quiz[this.qid].choice.push({
        content: "",
        correct: false
      })
      if (this.profileJson?.proposition[this.pid].quiz[this.qid].choice_amount != undefined) {
        this.profileJson.proposition[this.pid].quiz[this.qid].choice_amount += 1;
      }
      this.http.put('/api/user/'+this.profileJson?.id, this.profileJson).subscribe((response) => {
        console.log(response);
      })
    }
}

