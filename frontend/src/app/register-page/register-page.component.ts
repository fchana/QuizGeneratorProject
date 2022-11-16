import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  emailInput!: string;
  passwordInput?: string;
  confirmPasswordInput?: string;
  firstNameInput?: string;
  lastNameInput?: string;
  usernameInput?: string;

  constructor(private http: HttpClient) { }


  ngOnInit(): void {

  }

  Register(){
    const userInfo = {
      email: this.emailInput,
      username: this.usernameInput,
      password: this.passwordInput,
      firstname: this.firstNameInput,
      lastname: this.lastNameInput,
      account_type: false,
      proposition: [{}],
    }

    this.http.post('/api/user', userInfo).subscribe((response) => {
      console.log(response);
    })
  
  }

}
