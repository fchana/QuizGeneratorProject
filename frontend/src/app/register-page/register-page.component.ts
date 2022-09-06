import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserRequestService } from 'app/service/user-request.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  usernameInput!: string;
  passwordInput?: string;
  confirmPasswordInput?: string;
  firstNameInput?: string;
  lastNameInput?: string;

  constructor(private http: HttpClient, private userService:UserRequestService) { }

  ngOnInit(): void {

  }

  Register(){
    const userInfo = {
      username: this.usernameInput,
      password: this.passwordInput,
      firstname: this.firstNameInput,
      lastname: this.lastNameInput,
      account_type: false,
      score: [{}],
      proposition: [{}]
    }

    this.http.post('/api/user', userInfo).subscribe((response) => {
      console.log(response);
    })

    console.log(userInfo);  
  }


}
