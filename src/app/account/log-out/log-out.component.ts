import { Component, OnInit } from '@angular/core';
import {AccountComponent} from '../account.component';
import { User } from '../../user';
import { UserServiceService, SignUpResponse } from '../../user-service.service';
@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

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
  
logIn():void{
    this.loggedIn = true;
}
logOut(): void{
    this.loggedIn = false;
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
            this.logIn();//log in statis = true
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
            this.logIn()//log in statis = true
        } else {
            this.status = "username or password incorrect"
        }
    })
  }

}
