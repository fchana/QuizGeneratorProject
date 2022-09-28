import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { Quiz } from 'app/shared/Model/quiz';
import { Select } from 'app/shared/Model/select';
import { User } from 'app/shared/Model/user';
@Component({
  selector: 'app-start-prop',
  templateUrl: './start-prop.component.html',
  styleUrls: ['./start-prop.component.scss']
})
export class StartPropComponent implements OnInit {

  first: number = 0;

  totalRecords: number = 120;

  totalRecords2: number = 12;

  profileJson?: User;

  proposition?: Proposition[] = [];

  quizs!: Array<Quiz>;

  id: any;

  checked: boolean;

  isSelect: Array<any> = [];

  allUser: Array<User>;

  check: boolean = true;

  score: number;

  selects: Select[] = [];

  selected: number = 0;


  onPageChange(event: { first: number; }) {
    this.first = event.first;
  }

  refresh() {
    this.first = 0;
  }

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

              var _this: any = this;

              function pushProp() {
                _this.quizs = _this.proposition[_this.id].quiz;
                _this.totalRecords2 = _this.quizs.length;
                console.log(_this.quizs)
              }

              async function pushAllUser() {
                await _this.allUser.forEach((t: { proposition: any[]; }) => {
                  t.proposition.forEach((p: any) => {
                    if (p.allowed.includes(_this.profileJson?.id)) {
                      _this.proposition.push(p);
                    }
                  })
                });
                await pushProp();
                _this.quizs = _this.shuffle(_this.quizs);
              }
              pushAllUser()
            })
          }
        })
      ),
    );
  }

  Select(first: number, index: number) {
    if (this.selects.length <= first) {
      this.selects.push({
        index: first,
        select: [],
      })
      for (var i = 0; i < this.quizs[first].choice_amount; i++) {
        this.selects[first].select.push(false);
      }
    }

    if (this.selects[first].select[index] == false) {
      this.selects[first].select[index] = true;
      this.selected += 1;
    }
    else{
      this.selects[first].select[index] = false;
      this.selected -= 1;
    }

    console.log(this.selects)
    console.log(this.selected);

  }

  Next() {
    this.selected = 0;
    this.first += 1;

  }

  shuffle(array: Array<Quiz>) { 
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  

}

