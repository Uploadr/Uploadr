import { Component, OnInit } from '@angular/core';
import {Image} from '../image';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  imageList: Promise<Image[]>;
  imageResults: Image[] = [];
  showResults = false;
  name : string;
  tag : string;
  tags : string[] = []
  tagSearch = true;

  constructor(private imageService: ImageService) { }

  searchTags(check : boolean){
    this.tagSearch = check; 
  }

  async appendCollection(collection: Promise<Image[]>) {
    (await collection).forEach(async element => {
    this.imageResults.push(await element);
    })
  }

  searchImages() {
    this.imageResults = [];
    this.imageService.searchImages(this.tags).then((image : Image[]) => {
      this.imageResults = image;
    });
    this.tags = [];
    this.showResults = true;
  }
  
  ngOnInit(): void {
    this.imageList = this.imageService.getImages();
    this.showResults = false;
  }

  addTag(){
    if(this.tag != ""){
      this.tags.push(this.tag);
      this.tag = "";
    }
  }

  async searchTitle() {
    this.imageResults = [];
    (await this.imageList).forEach(image => {
      if (this.name === image.name) {
        this.imageResults.push(image)
      }
    })
    this.showResults = true;
    (<HTMLInputElement>document.getElementById("name")).value = "";
  }

}
