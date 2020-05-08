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
  name = '';

  constructor(private imageService: ImageService) { }

  async appendCollection(collection: Promise<Image[]>) {
    (await collection).forEach(async element => {
    this.imageResults.push(await element);
    })
  }

  async searchImages() {
    (await this.imageList).forEach(image => {
      if (this.name === image.name) {
        this.appendCollection(this.imageService.searchImages(image.tags));
      }
    })
    this.showResults = !this.showResults;
  }
  
  ngOnInit(): void {
    this.imageList = this.imageService.getImages();
    this.showResults = false;
  }

}
