import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserServiceService, SignUpResponse } from '../user-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private userService : UserServiceService) { }

  users : User[];

  ngOnInit(): void {
      this.userService.getUsers().then((users : User[]) => {
          this.users = users;
      })
      this.loggedIn= false;
  }

  status : string = "nothing to status";

  input_username : string;
  input_password : string;
  
  loggedIn: boolean; //monitor log in status

  newUser() : void {
    this.userService.addUser(
        this.input_username,
        this.input_password
    ).then((res : SignUpResponse) => {
        if(res.good) {
            this.status = "user added";
            this.loggedIn=true;//log in statis = true
        } else {
            this.status = res.err;
        }

        this.userService.getUsers().then((users : User[]) => {
            this.users = users;
        })
    });
  }

  signIn() : void {
    this.userService.signIn(
        this.input_username,
        this.input_password
    ).then((res : boolean) => {
        if(res) {
            this.status = "signed in"
            this.loggedIn = true;//log in statis = true
        } else {
            this.status = "username or password incorrect"
        }
    })
  }

}
