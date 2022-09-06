import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from 'app/shared/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  constructor(private http:HttpClient) { }


  getUsers(){
    return  this.http.get<Array<User>>("api/user")
  }
}
