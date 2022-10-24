import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Choice } from 'app/shared/Model/choice';
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

  _allUser: Array<User>;

  _prop: Proposition;

  check: boolean = true;

  score: number = 0;

  selects: Select[] = [];

  selected: number = 0;

  countDown: string = "";

  countDown2: string = "";

  countDownDate2: number;

  onPageChange(event: { first: number; }) {
    this.first = event.first;
  }

  refresh() {
    this.first = 0;
  }

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute, private router: Router) {
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
                _this._prop = _this.proposition[_this.id];
                for (var i = 0; i < _this.quizs.length; i++) {
                  _this.selects.push({
                    index: i,
                    select: [],
                  })
                  console.log("selects : ", _this.selects)
                }
              }

              async function pushAllUser() {
                await _this.allUser.forEach((t: { proposition: any[]; }) => {
                  t.proposition.forEach((p: any) => {
                    if (p.allowed.includes(_this.profileJson?.id) && (Date.now() >= new Date(p.start_date).getTime()) && p.active == true && new Date(Date.now()) <= new Date(_this.DateAdder(p.start_date, p.prop_time).getTime())) {
                      _this.proposition.push(p);
                    }
                  })
                });
                await pushProp();
                _this.quizs = _this.shuffle(_this.quizs);
                for (var k = 0; k < _this.quizs.length; k++) {
                  console.log("k : ", _this.quizs[k]);
                  for (var i = 0; i < _this.quizs[k].choice_amount; i++) {
                    console.log(_this.quizs[k].choice[i])
                    _this.selects[k].select.push(false);
                  }

                }
                _this.propTime();
                if (_this.proposition != undefined) {
                  _this.countDownDate2 = _this.DateAdder(new Date(), _this.quizs[0].time_limit).getTime();
                  _this.quizTime();
                }
              }
              pushAllUser()
            })
          }
        })
      ),
    );
  }

  Select(first: number, index: number) {

    if (this.selects[first].select[index] == false) {
      this.selects[first].select[index] = true;
      this.selected += 1;
    }
    else {
      this.selects[first].select[index] = false;
      this.selected -= 1;
    }

    console.log(this.selected, this.selects)

  }

  Next() {
    if (this.first < this.quizs.length - 1) {
      this.selected = 0;
      this.first += 1;
      this.countDownDate2 = this.DateAdder(new Date(), this.quizs[0].time_limit).getTime();
      this.quizTime();
      console.log("profileJson", this.profileJson);

    }
    else {
      console.log("profileJson", this.profileJson);
      this.router.navigateByUrl('/result', { state: { prop: this._prop, quizs: this.quizs, selects: this.selects, profileJson: this.profileJson } });
    }
  }

  shuffle(array: Array<Quiz>) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  propTime() {
    if (this.proposition != undefined) {
      var countDownDate = this.DateAdder(this.proposition[this.id].start_date, Number(this._prop.prop_time)).getTime();
    }
    var x = setInterval(() => {

      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.countDown = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

      if (distance < 0) {
        clearInterval(x);
        this.router.navigateByUrl('/result', { state: { prop: this._prop, quizs: this.quizs, selects: this.selects, profileJson: this.profileJson} });
      }
    }, 1000);
  }

  quizTime() {

    var x = setInterval(() => {

      var now = new Date().getTime();
      var distance = this.countDownDate2 - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.countDown2 = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

      if (distance < 0) {
        clearInterval(x);
        this.Next();
      }
    }, 1000);
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



}

