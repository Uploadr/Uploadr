import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Image } from './image';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  constructor() { }

  createDb() {
      // admin & guest users by default
      const users : User[] = [
          { id: 0, username: "admin", password: "admin" }, // very secure
          { id: 1, username: "guest", password: "guest" },
      ];
      const images: Image[] = [
        { id: 0, name: "Dog", user: "admin", url: "https://i.imgur.com/LRoLTlK.jpg", tags: ["animal", "dog", "cute", "funny", "admin"]},
        { id: 1, name: "Ocean", user: "guest", url: "https://i.imgur.com/DYPjpkX.jpg", tags:["nature", "ocean", "lake", "cool", "guest"]}
    ];
      return { images, users };
  }
}
