import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  emailForm = new FormControl(null, [Validators.required, Validators.email])
  usernameForm = new FormControl(null, [Validators.required])
  passwordForm = new FormControl(null, [Validators.required])
  confirmPasswordForm = new FormControl(null, [Validators.required])
  firstnameForm = new FormControl(null, [Validators.required])
  lastnameForm = new FormControl(null, [Validators.required])

  emailInput!: string;
  passwordInput?: string;
  confirmPasswordInput?: string;
  firstNameInput?: string;
  lastNameInput?: string;
  usernameInput?: string;

  constructor(private http: HttpClient, private messageService: MessageService, private router: Router) { }


  ngOnInit(): void {

  }

  confirmPass() {
    if (this.passwordInput == undefined && this.confirmPasswordInput == undefined)
      return true
    else
      return (this.passwordInput != this.confirmPasswordInput)
  }

  invalid() {
    return (this.emailForm.hasError('email') || this.emailForm.hasError('required') || this.usernameForm.hasError('required') || this.passwordForm.hasError('required') ||
      this.confirmPasswordForm.hasError('required') || this.passwordInput != this.confirmPasswordInput || this.firstnameForm.hasError('reqired') || this.lastnameForm.hasError('required'))
  }

  Register() {
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
      this.messageService.add({ severity: 'success', summary: 'Register account', detail: 'Register success.' });
      this.router.navigate(['/login'])
    })

  }

}
