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
  }

  status : string = "nothing to status";

  input_username : string;
  input_password : string;

  newUser() : void {
    this.userService.addUser(
        this.input_username,
        this.input_password
    ).then((res : SignUpResponse) => {
        if(res.good) {
            this.status = "user added";
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
        } else {
            this.status = "username or password incorrect"
        }
    })
  }

}
