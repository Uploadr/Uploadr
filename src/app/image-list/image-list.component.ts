import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { ImageService } from '../image.service';
import { Image } from '../image';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  constructor(private userService : UserServiceService, private imageService : ImageService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.imageService.getImages().then((images : Image[]) => {
      this.images = images;});
    }

  name : string;

  user : string;

  tags : string[] = []

  url : string;

  images : Image[]

  uploadImage(){
    this.user = this.userService.getCurrentUser();
    this.url = (<HTMLInputElement>document.getElementById("url")).value
    this.name = (<HTMLInputElement>document.getElementById("name")).value
    if(this.user == null){
      this.user = 'anonymous'
    }
    if(this.url != "" && this.name != ""){
      this.tags.push(this.user);
      this.imageService.uploadImage(this.name, this.user, this.url, this.tags).subscribe(data => {
        console.log(data)
      });
      (<HTMLInputElement>document.getElementById("url")).value = "";
      (<HTMLInputElement>document.getElementById("name")).value = "";
      (<HTMLInputElement>document.getElementById("tags")).value = "";
      this.tags = [];
      this.imageService.getImages().then((images : Image[]) => {
        this.images = images;});
    }
  }

  addTag(){
    if((<HTMLInputElement>document.getElementById("tags")).value != ""){
      this.tags.push((<HTMLInputElement>document.getElementById("tags")).value);
      (<HTMLInputElement>document.getElementById("tags")).value = "";
    }
  }
}
