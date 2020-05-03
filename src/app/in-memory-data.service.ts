import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() { }

  createDb() {
      // admin & guest users by default
      const users : User[] = [
          { id: 0, username: "admin", password: "admin" }, // very secure
          { id: 1, username: "guest", password: "guest" },
      ];

      return { users };
  }


}
