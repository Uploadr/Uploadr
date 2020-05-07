import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserServiceService, SignUpResponse } from '../user-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  static loggedIn: boolean;

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
  
  public loggedIn : boolean; //monitor log in status

    logIn():void{
        this.loggedIn = true;
    }
    logOut(): void{
        this.loggedIn = false;
        this.userService.signOut();
    }
    isLoggedIn():boolean{
        return this.loggedIn;
    }

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
