import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable({
    providedIn: 'root'
})
// name is my b, angular makes it really annoying to fix things like this
export class UserServiceService {

    private usersUrl: string = "api/users";

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient
    ) { }

    private async is_user(username : string) : Promise<boolean> {
        let users : User[] | void;
        
        // errors shouldn't ever occur with this statement, hence the ignore catch
        users = await this.http.get<User[]>(
            `${this.usersUrl}/?username=${username}`
            ).toPromise().catch((err) => {});

        if(!users) return false; // check if void

        return users.length > 0;
    }

    /**
     * Add a new user to the user database
     * 
     * @param username 
     * @param password 
     * @returns true on success, false on failure
     */
    async addUser(username: string, password: string): Promise<SignUpResponse> {

        // check if username already exists
        if(await this.is_user(username)) {
            return {
                good: false,
                err: "Username taken"
            };
        }

        let response : SignUpResponse = {
            good : true
        };

        await this.http.post<User>(
            this.usersUrl, 
            {username, password} as User, 
            this.httpOptions).toPromise().catch(err => {
                response = {
                    good: false,
                    err: "Unable to add new user"
                }
            });

        return response;
    }

    /**
     * Test if a given username and password pair are valid, true on good signin 
     * @param username 
     * @param password 
     */
    async signIn(username: string, password: string): Promise<boolean> {
        let users : User[] | void;
        
        users = await this.http.get<User[]>(
            `${this.usersUrl}/?username=${username}&password=${password}` // nice
            ).toPromise().catch((err) => {});

        if(!users) return false; // check if void

        return users.length > 0;
    }

    /**
     * returns an array of all registered users
     */
    async getUsers() : Promise<User[]> {
        let users : User[] | void = await this.http.get<User[]>(
            `${this.usersUrl}`
        ).toPromise().catch(err => {});

        if(!users) users = [];

        return users;
    }
}

export interface SignUpResponse {
    good : boolean; // true on good signup, false otherwise
    err? : string;
};
