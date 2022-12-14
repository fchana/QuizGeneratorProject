  import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
  import { Component, OnInit } from '@angular/core';
  import { AuthService } from '@auth0/auth0-angular';
  import { Proposition } from 'app/shared/Model/proposition';  import { User } from 'app/shared/Model/user';
  import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

  @Component({
    selector: 'app-prop-list',
    templateUrl: './prop-list.component.html',
    styleUrls: ['./prop-list.component.scss'],
    providers: [MessageService]
  })
  export class PropListComponent implements OnInit {

    profileJson?: User;
    proposition: Proposition[] = [];
    allUser!: Array<User>;
    active: Array<boolean> = [];
    items: MenuItem[];

    home: MenuItem;


    constructor(private http: HttpClient, public auth: AuthService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
      this.items = [

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/props'};

      this.CallProfile();
    }

    DeleteProp(index: number) {
      this.confirmationService.confirm({
        message: 'Are you sure to delete this proposition?',
        accept: () => {
          this.profileJson?.proposition.splice(index, 1);
          this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
            this.CallProfile();
            this.messageService.add({ severity: 'success', summary: 'Proposition delete.', detail: 'Proposition deleted success.' });

          })
        }
      });

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
              this.proposition.forEach((prop, index) => {
                this.active.push(prop.active);
              });
            }
            else {
              this.http.get('/api/user/').subscribe((response: any) => {
                this.allUser = response.filter((check: { account_type: boolean; }) => {
                  return check.account_type == true;
                })
                this.allUser.forEach(t => {
                  t.proposition.forEach((p: any) => {
                    if (p.allowed.includes(this.profileJson?.id) && Date.now() <= this.DateAdder(p.start_date, p.prop_time).getTime() && p.active == true) {
                      this.proposition.push(p);
                      console.log(this.proposition[0]);
                    }
                  })
                });
              })
            }
          })
        ),
      );
    }

    Active(index: number) {
      var propScore = 0;
      var propTime = 0;
      var contentEr = 0;
      var errorAr: Array<number> = [];
      var hasEr = 0;
      this.proposition[index].quiz.forEach(quiz => {
        console.log(quiz)
      });
      this.proposition[index].quiz.forEach((quiz, i) => {
        propScore += quiz.score;
        propTime += quiz.time_limit;
        if (quiz.content == '' || quiz.choice_type == 0 || quiz.time_limit == 0 || quiz.choice_amount == 0) {
          contentEr += 1;
          errorAr.push(i + 1);
        }
      });
      if (contentEr != 0) {
        this.active[index] = false;
        hasEr += 1;
        this.messageService.add({ severity: 'error', summary: 'Proposition Activation Failed', detail: 'Please complete your quiz. ' + contentEr + ' quiz amount error found. ' + errorAr });
      }
      if (this.proposition[index].active == false && propScore != Number(this.proposition[index].max_score)) {
        this.active[index] = false;
        hasEr += 1;
        this.messageService.add({ severity: 'error', summary: 'Proposition Activation Failed', detail: 'Please enter a valid proposition score.' });
      }
      if (this.proposition[index].active == false && propTime > Number(this.proposition[index].prop_time)) {
        this.active[index] = false;
        hasEr += 1;
        this.messageService.add({ severity: 'error', summary: 'Proposition Activation Failed', detail: 'Please enter a valid propposition time limit.' });
      }
      if (this.proposition[index].active == false && new Date(this.proposition[index].start_date).getTime() < Date.now()) {
        this.active[index] = false;
        hasEr += 1;
        this.messageService.add({ severity: 'error', summary: 'Proposition Activation Failed', detail: 'Please enter a valid date.' });
      }
      else if (hasEr == 0) {
        this.active[index] = !this.proposition[index].active;
        const userUpdate = {
          allowed: this.proposition[index].allowed,
          max_score: this.proposition[index].max_score,
          prop_name: this.proposition[index].prop_name,
          prop_time: this.proposition[index].prop_time,
          quiz: this.proposition[index].quiz,
          quiz_amount: this.proposition[index].quiz_amount,
          start_date: this.proposition[index].start_date,
          active: this.active[index],
          enable_score: this.proposition[index].enable_score
        }

        this.profileJson?.proposition.splice(index, 1, userUpdate);

        this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
          console.log(response);
        })
        if (this.proposition[index].active == true) {
          this.messageService.add({ severity: 'success', summary: 'Proposition Activate', detail: 'Proposition Activated Success' });
        }
        else
          this.messageService.add({ severity: 'success', summary: 'Proposition Deactivate', detail: 'Proposition Deactivated Success' });

      }
    }


  }